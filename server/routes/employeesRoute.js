import { Router } from 'express';
import IndexCtrl from '../controller/indexController';

const router = Router();
router.post('/', IndexCtrl.Employees.create);
router.post('/image', IndexCtrl.UploadDownload.uploadMultipart, 
    IndexCtrl.Employees.createII, 
    IndexCtrl.Employees.findAll);
router.get('/', IndexCtrl.Employees.findAll);
router.get('/:id', IndexCtrl.Employees.findOne);
router.put('/:id', IndexCtrl.Employees.update);
router.delete('/:id', IndexCtrl.Employees.remove);

export default router;