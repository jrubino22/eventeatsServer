var express = require('express');
var router = express.Router();

const User = require('../models/users')

const bcrypt = require('bcrypt')

/* GET users listing. */
router.post('/signup', (req, res) => {
    let {name, username, password} = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
      const newUser = new User({
        name,
        username,
        password: hashedPassword,
      });

      newUser.save().then(result => {
        res.json({
          status: "Success",
          message: "Signup successful",
          data: result,
        })
      })
      .catch(err => {
        res.json({
          status: "FAILED",
          message: "An error occured while creating account"       
      })
    })
    .catch(err => {
      res.json({
        status: "FAILED",
        message: "An error occured while hashing password"
      })
    })
  })
})

router.post('/signin', (req, res) => {
    let {username, password} = req.body;
    User.find({username})
    .then(data => {
        if (data.length) {
          const hashedPassword = data[0].password;
          bcrypt.compare(password, hashedPassword).then(result => {
            if (result) {

              res.json({
                status: "SUCCESS",
                message: "Signin successful",
                data: data
              })
            }else {
              res.json({
                status: "FAILED",
                message: "Incorrect password"
              })
            }
          })
          .catch(err => {
            res.json({
              status: "FAILED",
              message: "An unknown error occured"
            })
          })
        }else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials"
          })
        }
    })
    .catch(err => {
      res.json({
        status: "FAILED",
        message: "An error occured"
      })
    })
})
module.exports = router;
