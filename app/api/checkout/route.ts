import { ok, error } from "@/lib/server/api";
import { createMockCheckout } from "@/lib/server/checkout-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        items?: Array<{ id?: string; quantity?: number }>;
        name?: string;
        company?: string;
        email?: string;
        phone?: string;
        billing?: string;
        shipping?: string;
        notes?: string;
      }
    | null;
  const result = await createMockCheckout(body ?? {});

  if (!result.ok) {
    return error(result.message, result.status);
  }

  return ok(result);
}
