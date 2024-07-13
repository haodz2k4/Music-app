import { Express } from 'express';
//require router here
import dashboardRouter from './dashboard.router';
import songRouter from './song.router';
import accountRouter from './account.router';
import roleRouter from './roles.router';
import authRouter from './auth.router';
import topicRouter from './topic.router';
import singerRouter from './singer.router';
import userRouter from './user.router';
import system from '../../config/system';
const prefixAdmin: string = system.prefixAdmin;
//require middleware
import { requireAuth } from '../../middlewares/admin/auth.midlleware';
export default (app: Express) =>{
    app.locals.prefixAdmin = prefixAdmin
    app.use(`/${prefixAdmin}/dashboard`,requireAuth,dashboardRouter);
    app.use(`/${prefixAdmin}/songs`,requireAuth,songRouter);
    app.use(`/${prefixAdmin}/roles`,requireAuth,roleRouter);
    app.use(`/${prefixAdmin}/accounts`,requireAuth,accountRouter);
    app.use(`/${prefixAdmin}/topics`,requireAuth,topicRouter);
    app.use(`/${prefixAdmin}/singers`,requireAuth,singerRouter);
    app.use(`/${prefixAdmin}/users`,requireAuth, userRouter)
    app.use(`/${prefixAdmin}/auth/`,authRouter)

}