import fs from "fs";
import path from "path";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export function getStoredUsers(): StoredUser[] {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.warn("[UserStore] Could not read users.json, starting empty:", e);
    return [];
  }
}

export function findStoredUserByEmail(email: string): StoredUser | null {
  const users = getStoredUsers();
  const normalized = email.toLowerCase().trim();
  return users.find((u) => u.email.toLowerCase().trim() === normalized) || null;
}

export function saveStoredUser(user: StoredUser): void {
  try {
    ensureDirectoryExistence(USERS_FILE);
    const users = getStoredUsers();
    const existingIndex = users.findIndex(
      (u) => u.email.toLowerCase().trim() === user.email.toLowerCase().trim()
    );

    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("[UserStore] Failed to save user to users.json:", e);
  }
}
