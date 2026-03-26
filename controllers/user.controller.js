import { User } from "../models/user.models.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: true,
            message: "Users fetched successfully",
            data: {
                users
            }
        });
    } catch (error) {
        next(error);
    }
}


// Get user by ID
export const getUser = async (req, res, next) => {
    try {
        const userid = req.params.id; // id of the user to be fetched.
        const user = await User.findById(userid).select("-password");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            status: true,
            message: "User fetched successfully",
            data: {
                user
            }
        });

        /// END TRY BLOCK
    } catch (error) {
        next(error);
    }
}