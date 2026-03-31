import { NextResponse } from "next/server";

type ErrorPayload = {
  ok: false;
  message: string;
};

export const ok = <T extends Record<string, unknown>>(payload: T, init?: ResponseInit) =>
  NextResponse.json(payload, init);

export const error = (message: string, status = 400, extra?: Record<string, unknown>) =>
  NextResponse.json(
    {
      ok: false,
      message,
      ...extra,
    } satisfies ErrorPayload & Record<string, unknown>,
    { status },
  );
