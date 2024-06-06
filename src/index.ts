import app from './app';
import env from './config/env';
import docs from './docs';
import { consoleLogger as logger } from './logger';

app.listen(env.PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `\n\n🚀 Server running (http://localhost:${env.PORT}) in ${env.NODE_ENV} mode 🚀`,
  );
  logger.info(`Healthcheck: http://localhost:${env.PORT}/api/healthcheck`);
  docs(app, Number(env.PORT));
});
