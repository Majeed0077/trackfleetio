import { ok, error } from "@/lib/server/api";
import { submitMockContact } from "@/lib/server/contact-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        name?: string;
        company?: string;
        email?: string;
        message?: string;
      }
    | null;

  const result = await submitMockContact(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok(result);
}
