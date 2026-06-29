import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validation/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function createUserToken(payload) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const validationResult = userTokenSchema.safeParse(payload);

  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }

  const token = jwt.sign(
    validationResult.data,
    JWT_SECRET
  );

  return token;
}

export function validateUserToken(token){
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  }catch(error){
    return  null;
  }

}