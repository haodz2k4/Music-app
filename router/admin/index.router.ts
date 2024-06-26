import { Express } from 'express';
//require router here
import dashboardRouter from './dashboard.router';
import songRouter from './song.router';
import system from '../../config/system';
const prefixAdmin: string = system.prefixAdmin;

export default (app: Express) =>{
    app.locals.prefixAdmin = prefixAdmin
    app.use(`/${prefixAdmin}/dashboard`,dashboardRouter);
    app.use(`/${prefixAdmin}/songs`,songRouter);

}