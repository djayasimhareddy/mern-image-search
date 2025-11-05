import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/auth/login/failed"
}));

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/auth/login/failed"
}));

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/auth/login/failed"
}));

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL);
  });
});


router.get("/user", (req, res) => {
  if (req.user) res.send(req.user);
  else res.status(401).send("Not authenticated");
});

export default router;
