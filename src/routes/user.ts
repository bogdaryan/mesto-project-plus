import { Router } from 'express';
import {
  getCurrentUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
} from '../controlers/user-controler';
import userValidator from '../validations/user';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userValidator.getUser, getUser);

router.patch('/me', userValidator.updateUser, updateUser);
router.patch('/me/avatar', userValidator.updateUserAvatar, updateUserAvatar);

export default router;
