import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  const myString = 'Here dialogs streaming';
  res.send({ myString });
});

app.listen(3001, () => {
  console.log('Server working...');
});
