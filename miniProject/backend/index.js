const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "blog_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
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

app.listen(5000, () => console.log("Server runing 5000"));