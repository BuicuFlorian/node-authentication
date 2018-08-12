import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as path from 'path'
import * as dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes';
import config from './config/passport';

dotenv.config();

const port: string | number = process.env.PORT || 8080;

// If the connection is successfull.
mongoose.connection.on('connected', () => {
  console.log(`Connected to ${process.env.DB_URL}.`);

  const app = express();

  config(passport);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.use(helmet());
  app.use(helmet.noCache())
  app.use(helmet.frameguard())
  app.use(helmet.hidePoweredBy());

  app.use(session({ secret: process.env.SECRET }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', usersRoutes);

  app.listen(port, () => console.log(`Magic happens at http://localhost:${port}`));
});

// If the connection throws an error.
mongoose.connection.on('error', (err) => {
  console.error(`Failed to connect to ${process.env.DB_URL} on startup.`, err);
});

// When the database connection is disconnected.
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose default connection to ${process.env.DB_URL} is disconnected.`);
});

// If the Node process ends, close the Mongoose connection.
mongoose.connection.on('SIGINT', () => {
  mongoose.connection.close(() => {
      console.log(`Mongoose default connection to ${process.env.DB_URL} is disconnected due to app termination.`);
      process.exit(0);
  });
});

try {
  (mongoose as any).Promise = global.Promise;
  mongoose.connect(process.env.DB_URL);
  console.log(`Trying to connect to ${process.env.DB_URL}.`);
} catch (err) {
  console.log(`Server initialization failed ${err.message}`);
}
