import { Express } from "express"
import topicsRouter from './topics.router';
import songsRouter from './songs.router';
import userRouter from './user.router';
import searchRouter from './search.router';
import homeRouter from './home.router';
import singleRouter from './singer.router';
//require middleware here
import showAlertMdw from '../../middlewares/clients/showAlert.middleware';
import {infoUser} from '../../middlewares/clients/user.middleware';
export default (app: Express) =>{
    app.use(showAlertMdw);
    app.use(infoUser);
    app.use("/topics",topicsRouter);
    app.use("/songs",songsRouter);
    app.use("/user",userRouter);
    app.use("/search",searchRouter);
    app.use("/singer",singleRouter)
    app.use("/",homeRouter);
}