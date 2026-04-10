import { Model, Schema, Types, model, models } from "mongoose";

export type PasswordResetTokenDocument = {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const passwordResetTokenSchema = new Schema<PasswordResetTokenDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    usedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

passwordResetTokenSchema.index(
  { userId: 1, usedAt: 1, expiresAt: -1 },
  { name: "idx_password_reset_user_active" },
);
passwordResetTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0, name: "ttl_password_reset_expiry" },
);

export const PasswordResetTokenModel =
  (models.PasswordResetToken as Model<PasswordResetTokenDocument>) ||
  model<PasswordResetTokenDocument>("PasswordResetToken", passwordResetTokenSchema);
