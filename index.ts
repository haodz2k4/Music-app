
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
//method override
import methodOverride from 'method-override';
app.use(methodOverride('_method'));
//end method override 
//mce
import path from 'path';
/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
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
//socket
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';


const httpServer: HTTPServer = createServer(app);
const io: SocketIOServer = new SocketIOServer(httpServer); 

declare global {
    var _io: SocketIOServer;
}
  
global._io = io;
//end socket 
//end connect
import {config} from 'dotenv';
config();
//require clients router
import clientRouter from './router/clients/index.router';
clientRouter(app);
//admin router
import adminRouter from './router/admin/index.router';
adminRouter(app);
//end router 

app.use(static_('public'));
app.use("*",(req: express.Request, res: express.Response) =>{
    res.render("clients/pages/errors/404.pug")
    
})

const port: (string | undefined) = process.env.PORT
app.listen(port,() =>{
    console.log("SERVER IS RUNNING ON PORT " + port)
})