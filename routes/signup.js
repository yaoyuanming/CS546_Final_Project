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
    const test =  await user.getUserByEmail(email);

    if(test!=null){
        res.render("signup", { error: "email registed "});
    }
    else{
        newUser = await user.addNewUser(firstname, lastname, email);
        const password = req.body.signuppassword;
        var newCre = await credential.createNewCredential(email, password);
        res.redirect("/home")
    }

});



module.exports = router;