import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import axios from 'axios'
import passport from 'passport';


const covidRouter = express.Router();

covidRouter.get('/',
    passport.authenticate('jwt', { session: false }),
    expressAsyncHandler(async (req, res) => {
        try {

            const { data } = await axios.get('https://disease.sh/v3/covid-19/countries/');
            res.send(data)
        } catch (error) {
            res.status('401').send(error)
        }
    }))

export default covidRouter;