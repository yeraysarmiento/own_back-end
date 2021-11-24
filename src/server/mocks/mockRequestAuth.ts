import RequestAuth from "../utils/RequestAuth";

const mockRequestAuth = (body?: any, header?: any) => {
  const req = {} as RequestAuth;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.userId = "";

  return req;
};

export default mockRequestAuth;
