import app from './app';
import env from './config/env';

app.listen(env.PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `\n\n🚀 Server running at http://localhost:${env.PORT} in ${env.NODE_ENV} mode 🚀`,
  );
});
