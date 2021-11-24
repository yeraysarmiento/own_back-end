import { Request } from "express";

interface RequestAuth extends Request {
  params: any;
  userId?: string;
  username?: string;
  file?: any;
}

export default RequestAuth;
