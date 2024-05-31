import app from './app';
import env from './config/env';
import docs from './docs';

app.listen(env.PORT, () => {
  console.log(
    `Server running at http://localhost:${env.PORT} in ${env.NODE_ENV} mode`,
  );
  docs(app, Number(env.PORT));
});
