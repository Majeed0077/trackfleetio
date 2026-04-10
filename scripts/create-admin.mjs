import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const readEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separatorIndex = line.indexOf("=");
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        return [key, value];
      }),
  );
};

const parseArgs = (argv) => {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const value = argv[index + 1];
    args[key] = value;
    index += 1;
  }

  return args;
};

const args = parseArgs(process.argv.slice(2));
const env = {
  ...readEnvFile(path.join(process.cwd(), ".env.local")),
  ...process.env,
};

const mongoUrl = env.MONGO_DB_URL;
const email = (args.email || "").trim();
const password = args.password || "";
const name = (args.name || "Track Fleetio Super Admin").trim();
const company = (args.company || "TrackFleetio").trim();
const phone = (args.phone || "").trim();

if (!mongoUrl) {
  throw new Error("MONGO_DB_URL is required.");
}

if (!email) {
  throw new Error("--email is required.");
}

if (!password) {
  throw new Error("--password is required.");
}

if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
  throw new Error("Password must be at least 8 characters and include letters and numbers.");
}

const emailNormalized = email.toLowerCase();
const now = new Date();
const passwordHash = await bcrypt.hash(password, 12);

await mongoose.connect(mongoUrl, {
  autoIndex: false,
  serverSelectionTimeoutMS: 10000,
});

const users = mongoose.connection.db.collection("users");

const result = await users.updateOne(
  { emailNormalized },
  {
    $set: {
      name,
      email,
      emailNormalized,
      passwordHash,
      role: "admin",
      roleLabel: "Super Admin",
      company,
      phone,
      status: "active",
      emailVerifiedAt: now,
      passwordChangedAt: now,
      updatedAt: now,
    },
    $setOnInsert: {
      createdAt: now,
      lastLoginAt: null,
    },
  },
  { upsert: true },
);

const adminUser = await users.findOne(
  { emailNormalized },
  {
    projection: {
      email: 1,
      role: 1,
      roleLabel: 1,
      status: 1,
      company: 1,
      emailVerifiedAt: 1,
    },
  },
);

console.log(
  JSON.stringify({
    action: result.upsertedCount ? "created" : "updated",
    adminUser,
  }),
);

await mongoose.disconnect();
