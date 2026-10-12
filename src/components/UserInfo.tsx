// "use client"
// import { authClient } from '@/lib/auth-client';
// import Link from 'next/link';
// import React from 'react';

// const UserInfo = () => {
//     const { data: session } = authClient.useSession()
//     const user = session?.user
//     console.log(user);

//     const handleSignOut = async()=>{
//         await authClient.signOut();
//     }

//     return (
//         <div className='absolute right-4 top-4 flex items-center gap-3 text-sm'>
//             {
//                 user ? <div className='flex justify-between gap-3 items-center'>
//                     <div className="avatar">
//                         <div className="ring-primary ring-offset-base-100 w-15 rounded-full ring-2 ring-offset-2">
//                             <img alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
//                         </div>
//                     </div>
//                     <h2> {user.name} </h2>
//                     <button onClick={handleSignOut} className='btn text-red-700 btn-xs'>Sign out</button>

//                 </div> : <div>
//                     <Link href="/auth/sign-in"><button className='btn'>Sign in</button></Link>
//                     <Link href="/auth/sign-up"><button className='btn btn-success'>Sign up</button></Link>
//                 </div>
//             }

//         </div >
//     );
// };

// export default UserInfo;






"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function UserInfo() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/sign-in">
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
            Sign In
          </button>
        </Link>
        <Link href="/auth/sign-up">
          <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
            Sign Up
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* ✅ বাম পাশে ছবি, তারপর নাম */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
      >
        {/* ছবি */}
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
            onError={(e) => {
              const fallback = document.getElementById("header-avatar-fallback");
              if (fallback) fallback.style.display = "flex";
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        {/* নাম */}
        <span className="text-sm font-medium text-gray-800">{user.name}</span>
        
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ড্রপডাউন মেনু */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
            {/* মেনুর উপরের অংশ — ছবি + নাম + ইমেইল */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
              </div>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>

              <button
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/";
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 mt-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
