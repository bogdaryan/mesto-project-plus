import { addNewUser, getUser, getUsers } from '../controlers/user-controler';
import { Router } from 'express';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/users', addNewUser);

export default router;
