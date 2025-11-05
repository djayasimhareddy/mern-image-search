import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  googleId: String,
  githubId: String,
  facebookId: String,
  photo: String, // ✅ new field for user profile image
});

export default mongoose.model("User", userSchema);
