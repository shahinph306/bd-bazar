
// import { betterAuth } from "better-auth";
// import { google, github } from "better-auth/social-providers";
// // ✅ Correct name — all lowercase
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGODB_URI!);
// const db = client.db("bazaar_db");

// export const auth = betterAuth({
//   database: {
//     adapter: mongodbAdapter({ db }), // ✅ Same name here
//   },
//   emailAndPassword: {
//     enabled: true,
//     minPasswordLength: 8,
//   },
//   socialProviders: {
//     google: google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     github: github({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//   },
// });


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("bd-bazar");

export const auth = betterAuth({
  emailAndPassword:{
    enabled:true
  },

socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  },

   github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
},

  database: mongodbAdapter(db, {
    client,
  }),
});