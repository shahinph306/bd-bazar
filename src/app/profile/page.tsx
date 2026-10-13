
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    setImageError(false);
  }, [user?.image]);

  const avatarFallback = user?.name?.charAt(0).toUpperCase() || "U";

  const handleUpdateName = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (name.trim() === user?.name) {
      toast("Your name is already up to date");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error("Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Failed to sign out");
        setIsSigningOut(false);
        return;
      }

      window.location.href = "/";
    } catch {
      toast.error("Something went wrong");
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
          <p className="text-sm text-gray-600">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f0f5f0] px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Sign In Required
        </h1>

        <p className="mb-5 text-sm text-gray-600">
          Please sign in to view your profile.
        </p>

        <Link
          href="/auth/sign-in"
          className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
        >
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] bg-[#f0f5f0] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-700">
            Account Settings
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account information and personal details.
          </p>
        </div>

        <section className="mb-6 rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div className="relative h-20 w-20 shrink-0">
                {user.image && !imageError && (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={80}
                    height={80}
                    unoptimized
                    onError={() => setImageError(true)}
                    className="h-20 w-20 rounded-full border-2 border-green-500 object-cover"
                  />
                )}

                {(!user.image || imageError) && (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-500 bg-orange-500 text-3xl font-bold text-white">
                    {avatarFallback}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold text-gray-900">
                  {user.name || "User"}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>

                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Account Active
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-[#dce5dc] bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Update Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the name associated with your account.
            </p>
          </div>

          <form onSubmit={handleUpdateName} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                placeholder="Enter your name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500 outline-none"
              />

              <p className="mt-1.5 text-xs text-gray-400">
                Your email address is displayed for reference.
              </p>
            </div>

            <button
              type="submit"
              disabled={isUpdating || !name.trim()}
              className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </section>

        <p className="mt-5 text-center text-xs text-gray-400">
          BazarDor — Market prices at a glance.
        </p>
      </div>
    </main>
  );
}
