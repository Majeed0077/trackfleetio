import { ok, error } from "@/lib/server/api";
import { submitMockQuoteRequest } from "@/lib/server/quote-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        productId?: string | null;
        industry?: string;
        fleetSize?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        email?: string;
        company?: string;
      }
    | null;

  const result = await submitMockQuoteRequest(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok(result);
}
