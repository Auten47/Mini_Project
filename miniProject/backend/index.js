const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3001",
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
        maxAge: 1000 * 60 * 60,
    }
}));

app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => console.log("Server runing 5000"));