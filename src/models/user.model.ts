import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, minlength: 3 },
  fullname: { type: String, minlength: 3 },
  email: { type: String, required: true, unique: true, match: [emailRegex, 'Invalid email'] },
  password: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: function(value: string) {
        return passwordRegex.test(value);
      },
      message: (props: any) =>
        `${props.value} invalid format`,
    }
  },
  enable: { type: Boolean, default: true }
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUser>('User', userSchema);
