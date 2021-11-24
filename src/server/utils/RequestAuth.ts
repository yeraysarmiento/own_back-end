import { Request } from "express";

interface RequestAuth extends Request {
  params: any;
  userId?: string | undefined;
}

export default RequestAuth;
