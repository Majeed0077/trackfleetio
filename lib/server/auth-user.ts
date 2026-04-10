import type { UserDocument } from "@/lib/server/models/user";
import type { AuthUser } from "@/store/store";

type AuthUserSource = Pick<
  UserDocument,
  "name" | "email" | "role" | "roleLabel" | "company" | "phone" | "gender" | "profilePhoto"
> & {
  _id?: string | { toString(): string };
  id?: string;
};

export const toAuthUser = (user: AuthUserSource): AuthUser => ({
  id:
    typeof user.id === "string"
      ? user.id
      : user._id
        ? user._id.toString()
        : "",
  isAuthenticated: true,
  name: user.name,
  email: user.email,
  role: user.role,
  roleLabel: user.roleLabel,
  company: user.company ?? "",
  phone: user.phone ?? "",
  gender: user.gender ?? "male",
  avatarUrl: user.profilePhoto?.secureUrl ?? "",
});
