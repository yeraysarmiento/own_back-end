import { Request } from "express";

interface RequestAuth extends Request {
  params: any;
  userId?: string | undefined;
  username?: string | undefined;
}

export default RequestAuth;
