
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as { name: string, email: string, image: string, password: string };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      redirect("/");
    }

    if (error) {
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
      <h2 className="text-2xl font-bold">Sign up</h2>
      <p>Sign up for free and see all the detailed prices.</p>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset   rounded-box w-md">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="input w-md"
            placeholder="Name"
          />
          <label className="label">ImageURL</label>
          <input
            name="image"
            type="url"
            className="input w-md"
            placeholder="Image"
          />
          
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
            Sign up
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

export default SignUpPage;