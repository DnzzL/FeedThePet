import { ClientResponseError } from "pocketbase";
import { z } from "zod";

export function setErrorResponse(error: unknown) {
  let message: string;
  let status: number;

  if (error instanceof z.ZodError) {
    message = error.issues
      .map(({ path, message }) => `${path[0]} : ${message}`)
      .join(", ");
    status = 400;
  } else if (error instanceof ClientResponseError) {
    message = error.message;
    status = error.status;
  } else {
    message = "Erreur interne";
    status = 500;
  }
  return { message, status };
}
