import{Request, Response} from 'express';
import {getRepository} from "typeorm";
import shelterView from '../views/shelters_view'
import * as Yup from 'yup';

import Shelter from '../models/Shelter';


export default {
    async index (request:Request, response:Response){
        const sheltersRepository =  getRepository(Shelter);
        const shelters = await sheltersRepository.find({
            relations:['images']
        });

        return response.json(shelterView.renderMany(shelters));
    },
    async show (request:Request, response:Response){
        const { id }= request.params;
        const sheltersRepository =  getRepository(Shelter);
        const shelter = await sheltersRepository.findOneOrFail(id, {
            relations:['images']
        });

        return response.json(shelterView.render(shelter));
    },
    async create(request:Request, response:Response){
        const{
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        }= request.body;
    
        const sheltersRepository=getRepository(Shelter);

        const requestImages =  request.files as Express.Multer.File[];
        const images = requestImages.map(image=> {
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('Preencha o campo'),
            longitude: Yup.number().required('Preencha o campo'),
            about:Yup.string().required('Preencha o campo').max(300),
            instructions:Yup.string().required('Preencha o campo'),
            opening_hours:Yup.string().required('Preencha o campo'),
            open_on_weekends:Yup.boolean().required('Preencha o campo'),
            images:Yup.array(Yup.object().shape({
                path: Yup.string().required('Preencha o campo')
            })) ,


        })
         
        await schema.validate(data, {
            abortEarly: false,
        })
        const shelter= sheltersRepository.create(data);
    
        await sheltersRepository.save(shelter);
    
        return response.status(201).json(shelter)
    }
}