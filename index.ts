
import express, { Express, static as static_ } from 'express';
const app: Express = express();
//set up viewengine pug
app.set('view engine','pug');
app.set('views', './views');
//end pug 
//flash 
import session from 'express-session';
import flash from 'connect-flash';
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
//end flash 
//require moment
import moment from 'moment';
app.locals.moment = moment;


//end moment
//cookie parser
import cookieParser from 'cookie-parser';
app.use(cookieParser());
//body parser 
import {urlencoded, json} from 'body-parser';
app.use(urlencoded({ extended: false }));
app.use(json());
//connect database here
import {connectDB} from './config/database';
connectDB();
//end connect
import {config} from 'dotenv';
config();
//require clients router
import clientRouter from './router/clients/index.router';
clientRouter(app);
//end router 
app.use(static_('public'));
const port: (string | undefined) = process.env.PORT
app.listen(port,() =>{
    console.log("SERVER IS RUNNING ON PORT " + port)
})