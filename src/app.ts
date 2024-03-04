import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';

// Assuming you have these routes defined in TypeScript as well
import filloutFilteredResponse from './routes/filloutFilteredResponse';

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', filloutFilteredResponse);

// Catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// Error handler
app.use(function(err: any, req: Request, res: Response, _next: NextFunction) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.end(err.status ? `${err.status} - ${err.message}` : 'Server Error');
});

export default app;
