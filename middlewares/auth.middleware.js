import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

import { User } from "../models/user.models.js";


// Authorize middleware to protect routes
export const authorize = async (req, res, next) => {
    try {

        let token;

        // check the token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized access"
            });
        }
        // END IF
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized access"
            });
        }
        // Attach user to the request object
        req.user = user;
        next();


        // END TRY BLOCK
    } catch (error) {
        res.status(401).json({
            status: "fail",
            message: "Unauthorized access",
            error: error.message
        });
    }
}