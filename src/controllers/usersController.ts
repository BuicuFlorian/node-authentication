import { IUserDocument, UserModel as User } from '../models/user';
import IUser from '../types/IUser';

/**
 * Class used to manage the users.
 */
class UsersController {
  /**
   * Class constructor.
   */
  constructor() { }

  /**
   * Create a new account.
   *
   * @param {IUser} user
   * @returns {Promise<IUserDocument>}
   */
  async createAccount(user: IUser): Promise<IUserDocument> {
    const newUser = new User(user);
    await newUser.save();

    return newUser;
  }

  /**
   * Find a user by the given Facebook ID.
   *
   * @param {string} facebookId
   * @returns {Promise<IUserDocument>}
   */
  async getUserByFacebookId(facebookId: string): Promise<IUserDocument> {
    const foundUser: IUserDocument = await User.findOne({ 'facebook.id': facebookId }).lean().exec();

    if (foundUser) {
      return foundUser;
    }

    throw new Error('Couldn\'t find a user with that Facebook ID!');
  }

  /**
   * Find a user by the given ID.
   *
   * @param {string} userId
   * @returns {Promise<IUserDocument>}
   */
  async getUserById(userId: string): Promise<IUserDocument> {
    const foundUser: IUserDocument = await User.findOne({ _id: userId }).lean().exec();

    if (foundUser) {
      return foundUser;
    }

    throw new Error('Couldn\'t find a user with that ID!');
  }
}

/**
 * Exporting a new instance of UsersController class.
 */
export const usersController: UsersController = new UsersController();
