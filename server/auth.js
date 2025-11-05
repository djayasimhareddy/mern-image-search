import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "./models/user.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ---------------- GOOGLE STRATEGY ----------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          photo: profile.photos?.[0]?.value || "",
        });
      } else if (!user.photo && profile.photos?.length > 0) {
        user.photo = profile.photos[0].value;
        await user.save();
      }
      return done(null, user);
    }
  )
);

// ---------------- GITHUB STRATEGY ----------------
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = await User.create({
          name: profile.displayName || profile.username,
          githubId: profile.id,
          photo: profile.photos?.[0]?.value || "",
        });
      }
      return done(null, user);
    }
  )
);

// ---------------- FACEBOOK STRATEGY ----------------
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          facebookId: profile.id,
          photo: profile.photos?.[0]?.value || "",
        });
      }
      return done(null, user);
    }
  )
);
