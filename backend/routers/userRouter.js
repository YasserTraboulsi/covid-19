import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import passport from 'passport';

// express.Router is a function that make our code modular instead of having all routes in server.js, we can define multiple files to have our routers 
const userRouter = express.Router();


userRouter.post('/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {

                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: "Invalid email or password" });
    })
);

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const passValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!req.body.email.match(emailValidation)) {
        res.status(401).send({ message: "Email should be like example@gmail.com" });
    } else if (!req.body.password.match(passValidation)) {
        res.status(401).send({ message: "Password should be contain one: upper case, lower case, new number, no white space, one special char, minimum 8 chars" })
    } else {
        const user = new User({
            name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8), city: req.body.city,
        });
        const createdUser = await user.save();

        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser),
        });
    }
})
)

export default userRouter;