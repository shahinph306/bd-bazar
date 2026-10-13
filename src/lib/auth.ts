

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

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("bd-bazar");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["openid", "email", "profile"],
      mapProfileToUser: (profile) => ({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      scope: ["user:email", "read:user"],
      mapProfileToUser: (profile) => ({
        name: profile.name || profile.login,
        email: profile.email || "",
        image: profile.avatar_url,
      }),
    },
  },

  database: mongodbAdapter(db, { client }),
});