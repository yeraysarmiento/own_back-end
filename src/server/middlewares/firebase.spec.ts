import firebase from "./firebase";

describe("Given a firebase function", () => {
  describe("When it receives an object req with files", () => {
    test("Then it should add a property images in req and invoke next", async () => {
      const req = {
        files: [],
      };
      const next = jest.fn();

      await firebase(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("images");
    });
  });
  describe("When it receives an empty request", () => {
    test("Then it should invoke next without modifying the request", async () => {
      const req = {};
      const next = jest.fn();

      await firebase(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
