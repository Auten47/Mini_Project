const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config({ path: "../config/.env" });

const app = express();
app.set("trust proxy", 1);
const isProduction = process.env.NODE_ENV === "production";

const MySQLStore = require("express-mysql-session")(session);

const options = {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl: {
    rejectUnauthorized: false
  }
};

const sessionStore = new MySQLStore(options);


app.use(cors({
    origin: "https://blog-frontend-z72j.vercel.app",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    key: "blog_session",
    secret: "blog_secret_key",
    store: sessionStore, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
    }
}));

app.use((req, res, next) => {
    console.log("SESSION:", req.session);
    console.log("USER:", req.session.user);
    next();
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/register"));
app.use("/api/auth", require("./routes/google-auth"));
app.use("/api/auth", require("./routes/me"));
app.use("/api/auth", require("./routes/logout"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/likes", require("./routes/toggle"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));