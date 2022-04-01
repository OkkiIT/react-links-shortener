const { Router } = require("express");
const router = Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isMailValid = require("../helpers/index");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: "user already registered " });
    }

    if (isMailValid(email) && password.length > 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "user created" });
    } else {
      return res.status(400).json({ message: "try again" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password.length && !isMailValid(email)) {
      return res.status(400).json({ message: "wrong data" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user was not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "password is wrong,try again" });
    }

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "something gone wrong" });
  }
});

module.exports = router;
