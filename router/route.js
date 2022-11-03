import { Router } from "express";
const router = Router();

/** import controllers */
import * as controller from '../controllers/controller.js';

/** Questions Routes API */

router.route('/questions')
        .get(controller.getQuestions) 
        .post(controller.insertQuestions) 
        .delete(controller.dropQuestions) 

router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult)
        .delete(controller.dropResult)


router.route('/user')
        .get(controller.getUsers)
        .post(controller.storeUsers)

router.route('/admin')
        .get(controller.getAdmins)
        .post(controller.storeAdmins)

export default router;