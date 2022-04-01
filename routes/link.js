const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    const existingLinks = await Link.findOne({ from });

    if (existingLinks) {
      res.status(200).json({ link: existingLinks });
    }

    const to = baseUrl + `/t/` + code;

    const link = new Link({
      code,
      owner: req.user.userId,
      from,
      to,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "something gone wrong" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "something gone wrong" });
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "something gone wrong" });
  }
});

module.exports = router;
