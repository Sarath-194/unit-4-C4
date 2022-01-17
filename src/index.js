const express = require('express');

const userController = require('./controller/user.controller')
const evaluationController = require('./controller/evaluation.controller')
const {register, login} = require('./controller/auth.controller');

const app = express();
app.use(express.json())

app.post("/register", register);
app.post("login", login);

app.use("/user", userController) 
app.use("/evaluation", evaluationController)


module.exports = app

