import express from 'express';
import next from 'next';

import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import auth from './controllers/auth';
import user from './controllers/user';
import project from './controllers/project';
import category from './controllers/category';
import post from './controllers/post';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/auth', auth);
  app.use('/api/user', user);
  app.use('/api/project', project);
  app.use('/api/post', post);
  app.use('/api/category', category);

  app.use(errorHandler);

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
