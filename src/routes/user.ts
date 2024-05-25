import { Router } from 'express';
import {
  getCurrentUser,
  getUser,
  getUsers,
  updateProfile,
  updateProfileAvatar,
} from '../controlers/user-controler';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfileAvatar);

export default router;
