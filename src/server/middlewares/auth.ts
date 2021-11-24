// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const auth = (req: Request, res, next) => {
//   const authHeader = req.header("Authorization");
//   console.log(authHeader);
//   if (!authHeader) {
//     const error = new Error("Token missing");
//     error.code = 401;
//     next(error);
//   } else {
//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       const error = new Error("Token missing");
//       error.code = 401;
//       next(error);
//     } else {
//       try {
//         const user = jwt.verify(token, process.env.SECRET);
//         req.userId = user.id;
//         next();
//       } catch {
//         const error = new Error("Token invalid");
//         error.code = 401;
//         next(error);
//       }
//     }
//   }
// };

// export default auth;
