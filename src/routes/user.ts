import { Router } from 'express';
import {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
} from '../controlers/user-controler';
import auth from '../middleware/auth';

const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.get('/', getUsers);
router.get('/:userId', getUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfileAvatar);

export default router;
