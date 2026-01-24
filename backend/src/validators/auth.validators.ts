import { body } from "express-validator";
import { validateBody } from "../middlewares";

export const loginSchema = [

  body("email")
    .notEmpty().withMessage("Email is required"),
  body("password")
    .notEmpty().withMessage("Password is required"),

  validateBody
];