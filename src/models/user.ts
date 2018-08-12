import * as mongoose from 'mongoose';
import IUser from '../types/IUser';

const Schema = mongoose.Schema;

/**
 * Exporting IUserDocument interface.
 */
export interface IUserDocument extends mongoose.Document, IUser {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema({
    facebook: {
      id :{
        type: String,
        unique: true,
        trim: true,
        required: true,
      },
      token: {
        type: String,
        trim: true,
        required: true,
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true
      }
    },
}, {
        timestamps: true,
    });

/**
 * Exporting the user model.
 */
export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
