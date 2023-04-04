import { Router } from 'express';
import ModelMatches from '../models/Matches';
import ModelTeam from '../models/Team';
import ServiceMatches from '../service/matches.service';
import ControllerMatches from '../controller/matches.controller';

const router = Router();
const service = new ServiceMatches(ModelMatches, ModelTeam);
const controller = new ControllerMatches(service);
router.get('/', controller.getAll);

export default router;
