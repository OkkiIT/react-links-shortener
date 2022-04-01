const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const AuthRouter = require('./routes/auth');
const RedirectRouter = require('./routes/redirect')
const LinksRouter = require('./routes/link')
const app = express();
const PORT = config.get("port") || 5000;
const bodyParser = require('body-parser')



const start = async () => {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.use(bodyParser.json({extended:true}));
    app.use('/api/auth', AuthRouter)
    app.use('/api/links',LinksRouter)
    app.use('/t',RedirectRouter)
    app.listen(PORT, () => console.log(`app has been started on port ${PORT}`));
  } catch (e) {
    console.log("server error", e.message);
    process.exit(1);
  }
};
start();

