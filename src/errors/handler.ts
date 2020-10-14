import {ErrorRequestHandler} from 'express';
import {ValidationError} from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof ValidationError){
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        })

        return response.status(400).json({message:'Por favor, preencha todos os campos.', errors})
    }

    console.error(error);

return response.status(500).json({message: 'Desculpe, estamos com um problema. Tente novamente.'})
};

export default errorHandler;