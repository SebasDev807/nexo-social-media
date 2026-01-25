import { body } from "express-validator";
import { validateBody } from "../middlewares";

export const postSchema = [

    body("text")
        .notEmpty().withMessage("Text is missing")
        .isLength({ min: 10 }).withMessage("The text must contain a minimum of 10 characters."),

    validateBody
];