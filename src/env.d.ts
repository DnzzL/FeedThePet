/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    pb: import("./types/pocketbase").TypedPocketBase;
  }
}
