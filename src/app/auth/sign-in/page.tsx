
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