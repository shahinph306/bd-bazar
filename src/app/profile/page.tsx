"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  
  const [name, setName] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);

  // ✅ নতুন ছবি পেলে স্বয়ংক্রিয়ভাবে এরর রিসেট — useEffect নেই
  const currentImage = user?.image;
  // যখন ছবি পরিবর্তন হবে, তখন imageError ফিরে যাবে false
  const hasImage = !!currentImage && !imageError;

  // যখন নতুন ছবি আসবে, imageError রিসেট করার জন্য কী পরিবর্তন
  const imageKey = currentImage ? `${currentImage}` : "no-image";

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Please sign in to view your profile</p>
        <Link
          href="/auth/sign-in"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
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
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          Manage your account information here.
        </p>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[#dce5dc] p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              {/* Avatar Section */}
              {hasImage ? (
                <Image
                  key={imageKey}
                  src={currentImage!}
                  alt={user.name || "User"}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-3 border-green-500"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  id="profile-avatar-fallback"
                  className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold"
                >
                  {getInitial()}
                </div>
              )}

              {/* User Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/";
              }}
              className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white rounded-2xl border border-[#dce5dc] p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Update Information
          </h2>
          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}