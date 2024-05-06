import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 200,
  },
  avatar: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IUser>('User', userSchema);
