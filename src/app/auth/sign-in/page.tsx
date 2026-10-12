// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { authClient } from '@/lib/auth-client';
// import { useRouter } from 'next/navigation';
// import type { SubmitEventHandler } from 'react';

// // Define error type
// interface AuthError {
//   message: string;
// }

// export default function SignInPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleEmailSignIn: SubmitEventHandler<HTMLFormElement> = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await authClient.signIn.email({ email, password });
//       router.push('/');
//     } catch (err) {
//       const authError = err as AuthError;
//       setError(authError.message || 'Failed to sign in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     await authClient.signIn.social({ provider: 'google' });
//   };

//   const handleGitHubSignIn = async () => {
//     await authClient.signIn.social({ provider: 'github' });
//   };

//   return (
//     <main className="min-h-screen bg-[#f0f5f0] flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
//           <p className="text-gray-500 mt-2">
//             Log in to the account to view detailed prices, market comparisons and profiles.
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl border border-[#dce5dc] p-6 shadow-sm">
//           {error && (
//             <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>
//           )}

//           <form onSubmit={handleEmailSignIn} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="At least 8 characters"
//                 className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </form>

//           <div className="flex items-center my-6">
//             <div className="flex-1 h-px bg-gray-200"></div>
//             <span className="px-4 text-sm text-gray-500">or</span>
//             <div className="flex-1 h-px bg-gray-200"></div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <button
//               onClick={handleGoogleSignIn}
//               className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
//               type="button"
//             >
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               <span className="text-sm font-medium">Google</span>
//             </button>

//             <button
//               onClick={handleGitHubSignIn}
//               className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
//               type="button"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//               </svg>
//               <span className="text-sm font-medium">GitHub</span>
//             </button>
//           </div>

//           <p className="text-center text-sm text-gray-600 mt-6">
//             Dont have an account?{' '}
//             <Link href="/auth/sign-up" className="text-green-600 font-medium hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           <Link href="/" className="hover:underline">← Return to home page</Link>
//         </p>
//       </div>
//     </main>
//   );
// }



"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";

const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    console.log(user);

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign In successfull!");
      console.log(data);
    }

    if (error) {
      toast.error("Email or Password invalid!");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
   await authClient.signIn.social({
      provider: "google",
    });
    
    

  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold">Sign in</h2>
      <p>Log in to the account to view detailed prices, market comparisons <br /> and profiles.</p>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset   rounded-box w-md">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input w-md"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input w-md"
            placeholder="Password"
          />

          <button type="submit" className="btn text-white bg-green-700 mt-4 ">
            Sign In
          </button>
        </fieldset>
      </form>

      <div className="flex justify-between  items-center gap-2">
        <button onClick={handleGoogleSignIn} className="btn my-4"> <Image src="/google.png" alt='Image' width='40' height='40'></Image> Sign In With Google</button>
        <button onClick={handleGithubSignIn} className="btn "> <Image src="/github.png" alt='Image' width='40' height='40'></Image>  Sign In With Github</button>

      </div>

    </div>
  );
};

export default SignInPage;