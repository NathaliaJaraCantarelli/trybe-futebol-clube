import { Router } from 'express';
import ModelTeam from '../models/Team';
import ServiceTeam from '../service/team.service';
import ControllerTeam from '../controller/team.controller';

const router = Router();
const service = new ServiceTeam(ModelTeam);
const controller = new ControllerTeam(service);
router.get('/', controller.getAll);

export default router;
