import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiresponse.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return apiResponse(res, 401, "No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return apiResponse(res, 401, "Invalid token");
  }
}
