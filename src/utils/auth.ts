"use client";

export interface User {
  name: string;
  email: string;
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("officera_user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function loginUser(name: string, email: string) {
  if (typeof window === "undefined") return;
  const user: User = { name, email };
  localStorage.setItem("officera_user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("officera_user");
  window.dispatchEvent(new Event("auth-change"));
}
