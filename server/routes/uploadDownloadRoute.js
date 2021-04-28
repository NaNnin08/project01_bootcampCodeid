import { Router } from 'express';
import IndexCtrl from '../controller/indexController';

const router = Router();
router.post('/', IndexCtrl.UploadDownload.upload);
router.post('/profile/:id', IndexCtrl.UploadDownload.upload,IndexCtrl.Employees.image);
router.post('/multipart/', IndexCtrl.UploadDownload.uploadMultipart,IndexCtrl.Employees.multiImage);
router.get('/:filename', IndexCtrl.UploadDownload.download);

export default router;