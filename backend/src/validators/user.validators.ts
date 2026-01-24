import { body } from "express-validator";
import { validateBody } from "../middlewares";

export const createUserSchema = [

  body("firstName")
    .notEmpty().withMessage("firstName is required")
    .isLength({ max: 200 })
    .withMessage("First name cannot be more than 200 characters"),

  body("lastName")
    .notEmpty().withMessage("lastName is required")
    .isLength({ max: 200 })
    .withMessage("Last name cannot be more than 200 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),

  body("birthdate")
    .notEmpty().withMessage("Birthday is required")
    .isISO8601().withMessage("Birthday must be a valid date AAAA-MM-DD"),
  validateBody
];