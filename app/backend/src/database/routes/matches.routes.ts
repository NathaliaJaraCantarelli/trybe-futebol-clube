import { Router } from 'express';
import ModelMatches from '../models/Matches';
import ModelTeam from '../models/Team';
import ServiceMatches from '../service/matches.service';
import ControllerMatches from '../controller/matches.controller';
import vefiryToken from '../middlewares/vefiryToken';

const router = Router();
const service = new ServiceMatches(ModelMatches, ModelTeam);
const controller = new ControllerMatches(service);
router.get('/', controller.getAll);
router.patch('/:id/finish', vefiryToken.verifyAuthToken, controller.finishMatch);
router.patch('/:id', vefiryToken.verifyAuthToken, controller.editMatch);

export default router;