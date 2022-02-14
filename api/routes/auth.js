const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        // !user && res.status(400).json({ message: "User not found" });

        const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) {
            return res.status(400).json({message: "Invalid password"});
        }
        // !validate && res.status(400).json({ message: "Password is incorrect" });

        const { password, ...rest} = user._doc;

        return res.status(200).json(rest);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router;