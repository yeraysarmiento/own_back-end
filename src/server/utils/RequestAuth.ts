import { Request } from "express";

interface RequestAuth extends Request {
  params: any;
  userId?: string;
  username?: string;
  file?: any;
  files?: any;
  images?: any;
}

export default RequestAuth;
