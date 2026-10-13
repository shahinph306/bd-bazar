
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function UserInfo() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/sign-in"
          className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
        >
          Sign In
        </Link>

        <Link
          href="/auth/sign-up"
          className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const avatarFallback = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = document.getElementById(
                "header-avatar-fallback"
              );
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}

        <div
          id="header-avatar-fallback"
          className={`${user.image ? "hidden" : "flex"} w-8 h-8 rounded-full bg-orange-500 items-center justify-center text-white text-sm font-bold`}
        >
          {avatarFallback}
        </div>

        <span className="text-sm font-medium text-gray-800">
          {user.name}
        </span>

        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {avatarFallback}
                </div>
              )}

              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                My Profile
              </Link>

              <button
                type="button"
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/";
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 mt-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
