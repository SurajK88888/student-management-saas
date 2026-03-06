import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiresponse.js";

// REGISTER USER
export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return apiResponse(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    apiResponse(res, 201, "User registered successfully", user);
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return apiResponse(res, 401, "Invalid credentials.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return apiResponse(res, 401, "Invalid credentials.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    apiResponse(res, 200, "Login successful", { token });
  } catch (error) {
    next(error);
  }
}
