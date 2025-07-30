import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends ExpressRequest {
  userId?: string;
  user?: any;
  userEmail?: string;
}

const jwtSecretKey = process.env.JWT_SECRET_KEY || "";

export const isAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    if (decoded && decoded.userId) {
      req.user = decoded;
      req.userId = decoded.userId;
      req.userEmail = decoded.email;
      next();
    } else {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid token payload" });
    }
  });
};

export const isAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  isAuthenticated(req, res, () => {
    const userRole = req.user?.role;
    if (userRole === "CHANNELADMIN" || userRole === "SUPERADMIN") {
      next();
    } else {
      res.status(403).json({ error: "Forbidden: Admins or Superadmins only" });
    }
  });
};
//send email
