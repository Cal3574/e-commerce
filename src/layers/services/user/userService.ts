import { ApiResultWithData } from "../../../return/ApiReturn";
import { addUser, getUserByEmail } from "../../data-access/user/userRepository";

export async function addUserService(userData: any) {
  const response = await addUser(userData);
  return ApiResultWithData.SuccessfulResult(response);
}

export async function getUserByEmailService(email: string) {
  const response = await getUserByEmail(email);
  if (!response) {
    return ApiResultWithData.FailedResult(["User not found"]);
  }
  return ApiResultWithData.SuccessfulResult(response);
}
