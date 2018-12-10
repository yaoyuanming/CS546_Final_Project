const express = require('express');
const router = express.Router();
const data = require("../data");
const user = data.users;
const credential = data.credentials;

router.get("/", (req, res) => {
    //console.log(await user.getAllUsers());
    res.render("signup")
});

router.post('/', async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    var newUser = await user.addNewUser(firstname, lastname, email);
    const password = req.body.signuppassword;
    console.log(password);
    var newCre = await credential.createNewCredential(email, password);
    res.redirect("/home")
});



module.exports = router;