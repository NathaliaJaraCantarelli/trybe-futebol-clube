import { Router } from 'express';
import ServiceLeaderboard from '../service/leaderboard.service';
import ControllerLearderboard from '../controller/leaderboard.controller';
import Team from '../models/Team';
import Matches from '../models/Matches';

const router = Router();
const service = new ServiceLeaderboard(Team, Matches);
const controller = new ControllerLearderboard(service);

router.get('/', controller.getAll);
router.get('/home', controller.getHome);
router.get('/away', controller.getAway);

export default router;
