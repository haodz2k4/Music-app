import { Express } from 'express';
//require router here
import dashboardRouter from './dashboard.router';
import songRouter from './song.router';
import accountRouter from './account.router';
import roleRouter from './roles.router';
import system from '../../config/system';
const prefixAdmin: string = system.prefixAdmin;

export default (app: Express) =>{
    app.locals.prefixAdmin = prefixAdmin
    app.use(`/${prefixAdmin}/dashboard`,dashboardRouter);
    app.use(`/${prefixAdmin}/songs`,songRouter);
    app.use(`/${prefixAdmin}/roles`,roleRouter);
    app.use(`/${prefixAdmin}/accounts`,accountRouter)

}