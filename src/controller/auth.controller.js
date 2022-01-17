require('dotenv').config();

const jwt = require('jsonwebtoken')

const User = require('../models/user.model');
const newToken = (user) => {
  return jwt.sign( {user:user}, process.env.JWT_SECRET_KEY);
}

const register = async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email}).lean().exec();

    if(user) return res.status(400).send({message:"User registered"});
    user =  await User.create(req.body);

    const token = newToken(user)
    return res.status(201).send({user, token});
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const login = async(req, res) =>{
  try {
    let user = await User.findOne({email:req.body.email});

    if(!user) return res.status(400).send({message:'incorrect email or pass'})

    const match = user.checkPassword(req.body.password);

    if(!match) return res.status(400).send({message:"incorrect email or password"});

    const token = newToken(user);

    return res.status(201).send(user, token)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

module.exports = {register, login, newToken};
