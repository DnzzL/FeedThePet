import { defineMiddleware, sequence } from "astro:middleware";
import "dotenv/config";
import PocketBase from "pocketbase";

const UNLOGGED_ROUTES = ["/login", "/signup"];

const authCookie = defineMiddleware(
  async ({ locals, request }: any, next: () => any) => {
    locals.pb = new PocketBase(process.env.POCKETBASE_URL);

    locals.pb.autoCancellation(false);

    // load the store data from the request cookie string
    locals.pb.authStore.loadFromCookie(request.headers.get("cookie") || "");

    try {
      // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
      locals.pb.authStore.isValid &&
        (await locals.pb.collection("users").authRefresh());
    } catch (_) {
      // clear the auth store on failed refresh
      locals.pb.authStore.clear();
    }

    const response = await next();

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append("set-cookie", locals.pb.authStore.exportToCookie());

    return response;
  }
);

const guardedPage = defineMiddleware(
  async ({ locals, url, redirect }, next: () => any) => {
    const response = await next();

    if (
      !locals.pb.authStore.isValid &&
      !UNLOGGED_ROUTES.includes(url.pathname)
    ) {
      return redirect("/login");
    }

    return response;
  }
);

export const onRequest = sequence(authCookie, guardedPage);
