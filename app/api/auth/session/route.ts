import { ok } from "@/lib/server/api";
import { getDemoSession } from "@/lib/server/auth-service";

export async function GET() {
  const result = await getDemoSession();
  return ok(result);
}
