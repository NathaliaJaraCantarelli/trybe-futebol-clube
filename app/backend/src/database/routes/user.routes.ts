import { Router } from 'express';
import ModelUser from '../models/User';
import ServiceUser from '../service/user.service';
import ControllerUser from '../controller/user.controller';
import validateLogin from '../middlewares/validateLogin';
import vefiryToken from '../middlewares/vefiryToken';

const router = Router();
const service = new ServiceUser(ModelUser);
const controller = new ControllerUser(service);
router.post('/', validateLogin, controller.verifyLogin);
router.get('/role', vefiryToken.verifyAuthToken, controller.roleToken);

export default router;
