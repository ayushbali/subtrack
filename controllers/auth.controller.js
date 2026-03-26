// Notes for self
// a request body req.body is the data coming from the client specifically in the POST request. It contains the data that the client is sending to the server. For example, when a user signs up, they might send their username, email, and password in the request body. The server can then access this data using req.body and use it to create a new user in the database or perform other operations as needed.

// Imports
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { User } from "../models/user.models.js";

// env
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

// Controllers

// Sign UP
export const signUp = async (req, res, next) => {
  /// this session is a session of mongioose transaction => for ATOMIC operations
  const session = await mongoose.startSession();
  session.startTransaction(); // this will start the transaction

  try {
    // Create a new User.
    const { name, email, password } = req.body;

    // check if user already exisit
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 409; // Conflict
      throw error;
    }

    // hash the password before
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user in the database
    const newUsers = await User.create([{
      name,
      email,
      password: hashedPassword
    }], { session });


    // Generate a JWT Token for the user
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


    // this will commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send the response with the token
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        token,
        userDetails: newUsers[0],
      }
    });
  } catch (error) {
    // if something goes wrong
    await session.abortTransaction(); // this will abort the transaction
    session.endSession(); // this will end the session
    next(error);
  }
};

// Sign In
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User with this email does not exist");
      error.statusCode = 404; // Not Found
      throw error
    };
    // if user exists, compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401; // Unauthorized
      throw error;
    }
    // generate new token if the password is valid
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // send the response with the token.
    res.status(200).json({
      status: "success",
      message: "User signed in successfully",
      data: {
        token,
        userDetails: user,
      }
    });


    // END TRY BLOCK
  } catch (error) {
    next(error);
  }; // END CATCH BLOCK
}

// Sign Out
export const signOut = async (req, res) => { };
