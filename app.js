
require('dotenv').config();
require('express-async-errors');


//rest of the packages
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');







// database
const connectDB = require('./DB/connect');




//ROUTES
const leaguesRouter = require('./routes/leagueRoute')
const teamsRouter = require('./routes/teamsRoute')
const playersRouter = require('./routes/playersRoute')
const AuthRouter = require('./routes/authRoute')
const UserRouter = require('./routes/userRoute')


//app.use(express.static(__dirname, 'public'));


app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.JWT_SECT))
app.use(express.static('./public'));
app.use(fileUpload());


 
//errorHandlerMiddleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/leagues', leaguesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/players', playersRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//port
const port = process.env.PORT || 5500;

const start = async () => {
 try {
     await connectDB(process.env.MONGO_URI);
    app.listen(port, ()=>{
        console.log(`listing on port ${port}...`)
    }) 
 } catch (error) {
     console.log(error)
 }   
};

start();