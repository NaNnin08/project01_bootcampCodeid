import { Router } from 'express';
import IndexCtrl from '../controller/indexController';

const router = Router();
router.post('/', IndexCtrl.Projects.create);
router.get('/', IndexCtrl.Projects.findAll);
router.get('/:id', IndexCtrl.Projects.findOne);
router.put('/:id', IndexCtrl.Projects.update);
router.delete('/:id', IndexCtrl.Projects.remove);

export default router;