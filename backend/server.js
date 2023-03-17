import express from 'express'
import mongoose from 'mongoose';
import passport from 'passport';
import { applyPassportStrategy } from './utils.js';
import userRouter from './routers/userRouter.js'
import covidRouter from './routers/covidRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// Apply strategy to passport
applyPassportStrategy(passport);
mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://yasser:database@main.twjbt8n.mongodb.net/covid?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

app.use('/api/users', userRouter);
app.use('/api/covid', covidRouter);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

// this middleware is an error catcher.So, when an error appear in the routers that use expressAsyncHandler then the error will be redirected to this function or middleware and then the right error will redirected to the frontend
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Serve at http://localhost:${port}`);
})