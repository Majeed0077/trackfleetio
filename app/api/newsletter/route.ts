import { ok, error } from "@/lib/server/api";
import { submitMockNewsletter } from "@/lib/server/newsletter-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const result = await submitMockNewsletter(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok(result);
}
