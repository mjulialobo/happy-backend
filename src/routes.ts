import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import SheltersController from './controllers/SheltersController'


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/shelters', SheltersController.index) 
routes.get('/shelters/:id', SheltersController.show) 
routes.post('/shelters', upload.array('images'),SheltersController.create) 

export default routes;