import { Router } from 'express';

const healthCheckRouter = Router();

healthCheckRouter.get('/', (_req, res, next) => {
  /*
    #swagger.tags = ['Healthcheck']
    #swagger.summary = 'Healthcheck'
    #swagger.description = 'Ensure that app is up and running'
    #swagger.responses[200] = {
      description: 'OK',
      schema: { 
        message: 'Server is up and running'
      }
    }
  */
  try {
    res.status(200).json({
      message: 'Server is up and running',
    });
  } catch (error) {
    next(error);
  }
});

export default healthCheckRouter;
