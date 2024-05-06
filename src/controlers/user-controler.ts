import User from '../models/user';
import { Request, Response } from 'express';

const getUsers = (req: Request, res: Response) => {
  User.find().then((users) => res.send(users));
};

const getUser = (req: Request, res: Response) => {
  User.findById(req.params.userId).then((user) => res.send(user));
};

const addNewUser = (req: Request, res: Response) => {};

export { getUsers, getUser, addNewUser };
