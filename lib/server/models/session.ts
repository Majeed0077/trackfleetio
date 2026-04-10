import { Model, Schema, Types, model, models } from "mongoose";

export type SessionDocument = {
  userId: Types.ObjectId;
  sessionId: string;
  expiresAt: Date;
  lastSeenAt: Date;
  revokedAt: Date | null;
  userAgent: string;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
};

const sessionSchema = new Schema<SessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: {
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
    lastSeenAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    revokedAt: {
      type: Date,
      default: null,
      index: true,
    },
    userAgent: {
      type: String,
      default: "",
      maxlength: 512,
    },
    ipAddress: {
      type: String,
      default: "",
      maxlength: 128,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "ttl_sessions_expiry" });
sessionSchema.index(
  { userId: 1, revokedAt: 1, expiresAt: -1 },
  { name: "idx_sessions_user_active" },
);

export const SessionModel =
  (models.Session as Model<SessionDocument>) || model<SessionDocument>("Session", sessionSchema);
