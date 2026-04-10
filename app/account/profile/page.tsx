import { CustomerProfileForm } from "@/components/account/CustomerProfileForm";
import { getSessionUser } from "@/lib/server/auth-session";

export default async function AccountProfilePage() {
  const user = await getSessionUser();

  return <CustomerProfileForm user={user} />;
}
