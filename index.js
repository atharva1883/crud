const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// mongoose.connect("mongodb+srv://atharvapawar1883:007a1883@cluster0.q2nfyxj.mongodb.net/atharva");
mongoose.connect("mongodb://localhost:27017/atharva").then(() => {
    console.log("conneted to monb")
}).catch((e) => { console.log("conneton problem", e) });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const findResult = await User.findOne({ username: username });
        if (findResult)
            res.send("Username Already Exist");
        else {
            const newUser = new User({
                username: username,
                password: password
            });
            await newUser.save();
            res.send("User Registered Sucessfully");
        }
    }
    catch (err) {
        res.send("An Error Occured");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const findResult = await User.findOne({ username: username });
        if (findResult) {
            if (findResult.password === password)
                res.send("Login Successful");
            else
                res.send("Incorrect Password");
        }
        else {
            res.send("Username not exist. Please register first.");
        }
    }
    catch (err) {
        res.send("An Error Occured");
    }
});

app.post('/delete', async (req, res) => {
    try {
        const { username, password } = req.body;
        const findResult = await User.findOneAndDelete({ username: username });
        if (findResult) {
            res.send("User deleted Successfully");
        }
        else {
            res.send("Username not exist.");
        }
    }
    catch (err) {
        res.send("An Error Occured");
    }
});

app.post('/update', async (req, res) => {
    try {
        const { username, password } = req.body;
        const findResult = await User.findOneAndUpdate({ username: username }, { password: password });
        if (findResult) {
            res.send("User's Password updated Successfully");
        }
        else {
            res.send("Username not exist.");
        }
    }
    catch (err) {
        res.send("An Error Occured");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});