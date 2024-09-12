import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Optional if not set on every request
    }
  }
}

// declare global {
//     namespace Express {
//         interface Request {
//             user?: User; // Add the `user` property to the Request object
//         }
//     }
// }

import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  user_id: string;
  email: string;
}

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: CustomJwtPayload;
//   }
// }
