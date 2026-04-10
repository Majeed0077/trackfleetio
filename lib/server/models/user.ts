import { deleteModel, Model, Schema, model, models } from "mongoose";

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "invited" | "inactive" | "suspended";
export type UserGender = "male" | "female";
export type UserProfilePhoto = {
  publicId: string;
  secureUrl: string;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number | null;
  resourceType: string;
};

export type UserDocument = {
  name: string;
  email: string;
  emailNormalized: string;
  passwordHash: string;
  role: UserRole;
  roleLabel: string;
  company: string;
  phone: string;
  gender: UserGender;
  profilePhoto: UserProfilePhoto | null;
  status: UserStatus;
  emailVerifiedAt: Date | null;
  passwordChangedAt: Date | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const userProfilePhotoSchema = new Schema<UserProfilePhoto>(
  {
    publicId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 240,
    },
    secureUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    format: {
      type: String,
      default: null,
      trim: true,
      maxlength: 32,
    },
    bytes: {
      type: Number,
      default: null,
    },
    resourceType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
  },
  {
    _id: false,
    id: false,
  },
);

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 320,
    },
    emailNormalized: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 320,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    roleLabel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    company: {
      type: String,
      default: "",
      trim: true,
      maxlength: 160,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
      maxlength: 40,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },
    profilePhoto: {
      type: userProfilePhotoSchema,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "invited", "inactive", "suspended"],
      default: "active",
      required: true,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.index({ emailNormalized: 1 }, { unique: true, name: "uq_users_email_normalized" });
userSchema.index({ role: 1, status: 1 }, { name: "idx_users_role_status" });

if (process.env.NODE_ENV !== "production" && models.User) {
  deleteModel("User");
}

export const UserModel = (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);
