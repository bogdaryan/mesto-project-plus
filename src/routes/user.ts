import { Router } from 'express';
import {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateProfileAvatar,
} from '../controlers/user-controler';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfileAvatar);

export default router;
