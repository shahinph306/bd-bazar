
// "use client";
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";
// import { useState } from "react";
// import Image from "next/image";

// export default function UserInfo() {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   if (!user) {
//     return (
//       <div className="flex items-center gap-2">
//         <Link href="/auth/sign-in">
//           <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
//             Sign In
//           </button>
//         </Link>
//         <Link href="/auth/sign-up">
//           <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
//             Sign Up
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">

//       <button
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
//       >

//         {user.image ? (
//           <Image
//             src={user.image}
//             alt={user.name || "User"}
//             width={32}
//             height={32}
//             className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
//             onError={(e) => {
//               const fallback = document.getElementById(
//                 "header-avatar-fallback"
//               );
//               if (fallback) fallback.style.display = "flex";
//               e.currentTarget.style.display = "none";
//             }}
//           />
//         )  : (
//         <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
//           {user.name?.charAt(0).toUpperCase() || "U"}
//         </div>
//         )}

//         <span className="text-sm font-medium text-gray-800">{user.name}</span>

//         <svg
//           className={`w-4 h-4 text-gray-500 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isMenuOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-10"
//             onClick={() => setIsMenuOpen(false)}
//           />
//           <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
           
//             <div className="p-4 border-b border-gray-100 flex items-center gap-3">
//               {user.image ? (
//                 <img
//                   src={user.image}
//                   alt={user.name || "User"}
//                   className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
//                   {user.name?.charAt(0).toUpperCase() || "U"}
//                 </div>
//               )}
//               <div>
//                 <p className="font-semibold text-gray-900">{user.name}</p>
//                 <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
//               </div>
//             </div>

//             <div className="p-2">
//               <Link
//                 href="/profile"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 My Profile
//               </Link>

//               <button
//                 onClick={async () => {
//                   await authClient.signOut();
//                   window.location.href = "/";
//                 }}
//                 className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 mt-1"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }






"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function UserInfo() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const avatarLetter = user?.name?.charAt(0).toUpperCase() || "U";
  const imageUrl = user?.image || "";

  const headerImageError = failedImages.includes(
    `header:${imageUrl}`
  );

  const menuImageError = failedImages.includes(
    `menu:${imageUrl}`
  );

  const markImageFailed = (key: string) => {
    setFailedImages((previous) =>
      previous.includes(key) ? previous : [...previous, key]
    );
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/sign-in"
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Sign In
        </Link>

        <Link
          href="/auth/sign-up"
          className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsMenuOpen((previous) => !previous)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
        aria-expanded={isMenuOpen}
        aria-label="Open user menu"
      >
        <div className="relative h-8 w-8 shrink-0">
          {imageUrl && !headerImageError && (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt={user.name || "User"}
              width={32}
              height={32}
              unoptimized
              onError={() => markImageFailed(`header:${imageUrl}`)}
              className="h-8 w-8 rounded-full border-2 border-green-500 object-cover"
            />
          )}

          {(!imageUrl || headerImageError) && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
              {avatarLetter}
            </div>
          )}
        </div>

        <span className="max-w-36 truncate text-sm font-medium text-gray-800">
          {user.name || "User"}
        </span>

        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
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
          <button
            type="button"
            aria-label="Close user menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="absolute right-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            <div className="flex items-center gap-3 border-b border-gray-100 p-4">
              <div className="relative h-10 w-10 shrink-0">
                {imageUrl && !menuImageError && (
                  <Image
                    key={imageUrl}
                    src={imageUrl}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    unoptimized
                    onError={() => markImageFailed(`menu:${imageUrl}`)}
                    className="h-10 w-10 rounded-full border-2 border-green-500 object-cover"
                  />
                )}

                {(!imageUrl || menuImageError) && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                    {avatarLetter}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {user.name || "User"}
                </p>
                <p className="mt-0.5 break-all text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                <svg
                  className="h-4 w-4"
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
                  try {
                    const { error } = await authClient.signOut();

                    if (error) {
                      console.error("Sign out failed:", error);
                      return;
                    }

                    window.location.href = "/";
                  } catch (error) {
                    console.error("Sign out failed:", error);
                  }
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
              >
                <svg
                  className="h-4 w-4"
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
