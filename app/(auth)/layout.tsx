import { AuthHeader } from "@/components/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-page">
      <AuthHeader />
      {children}
    </div>
  );
}
