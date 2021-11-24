import { Request } from "express";

const mockRequest = (id) => {
  const req = {} as Request;
  req.params = id;
  return req;
};

export default mockRequest;
