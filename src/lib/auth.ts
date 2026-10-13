

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.MONGODB_URI as string);
// const db = client.db("bd-bazar");

// export const auth = betterAuth({
//   emailAndPassword:{
//     enabled:true
//   },

// socialProviders: {
//   google: {
//     clientId: process.env.GOOGLE_CLIENT_ID as string,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//   },

//    github: {
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     },
// },

//   database: mongodbAdapter(db, {
//     client,
//   }),
// });




import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import Google from "better-auth/providers/google";
import GitHub from "better-auth/providers/github";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("bd-bazar");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },

  // ইউজার মডেলে image ফিল্ড যোগ
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
        description: "User profile image URL from social login"
      }
    }
  },

  socialProviders: {
    google: Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Google প্রোফাইল থেকে ছবি নিয়ে সেভ করুন
      mapProfileToUser: (profile) => ({
        name: profile.name,
        email: profile.email,
        image: profile.picture // ← Google এর ছবির লিঙ্ক
      })
    }),

    github: GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      // GitHub প্রোফাইল থেকে ছবি নিয়ে সেভ করুন
      mapProfileToUser: (profile) => ({
        name: profile.name || profile.login,
        email: profile.email || "",
        image: profile.avatar_url // ← GitHub এর ছবির লিঙ্ক
      })
    })
  },

  database: mongodbAdapter(db, {
    client,
  })
});