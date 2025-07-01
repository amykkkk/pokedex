"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getCookie(key: string) {
  return (await cookies()).get(key)?.value;
}

export async function setCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>,
) {
  return (await cookies()).set(key, value, options);
}
