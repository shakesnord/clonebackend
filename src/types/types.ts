import { Request as ExpressRequest, Response, NextFunction } from "express";

export interface CustomRequest extends ExpressRequest {
  user?: {
    userId?: string;
    role: string;
    email?: string;
  };
}
//send email
