import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.DEBUG_PRISMA === "true"
        ? ["query", "error", "warn"]
        : ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export async function withDbTimeout<T>(promise: Promise<T>, timeoutMs = 1500): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Database operation timed out")), timeoutMs);
  });
  try {
    const res = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return res;
  } catch (err) {
    clearTimeout(timeoutId!);
    throw err;
  }
}
