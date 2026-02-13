const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    db.query(
        "SELECT * FROM users WHERE email = ? ",
        [email],
        async(err, result) => {
            if(err) return res.status(500).json(err);
            if(result.length === 0 ) 
                return  res.status(401).json({message: "User not found"});

            const user = result[0]; 
            // const match = await bcrypt.compare(password, user.password);

            // if(!match)
            //     return res.status(401).json({message: "Wrong password"})

            if(password !== user.password) {
                return res.status(401).json({message: "Wrong password"})
            }

            req.session.user = {
                id: user.id,
                email: user.email,
                name: user.name,
            };

            res.json({
                message: "Login success",
                user: req.session.user,
            });
        }
    );
});

module.exports = router;