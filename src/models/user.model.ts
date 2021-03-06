import { User, UserDocument } from './schemas/user.schema';
import ServerError from '../errors/server.error';
import { UserInterface } from '../interfaces/user.interface';

class UserModel {

    public async getAllUsers(): Promise<UserDocument[]> {
        try {
            return User.find({}).select('-password');
        } catch (err) {
            throw new ServerError(err);
        }
    }

    public async getUser(id: string): Promise<UserDocument | null> {
        try {
            return User.findById(id).select('-password');
        } catch (err) {
            throw new ServerError(err);
        }
    }

    public async create(user: Omit<UserInterface, 'tasks' | 'assignedTasks' | '_id'>): Promise<UserDocument> {
        const { email, password, name } = user;
        try {
            return await User.create({ email, password, name });
        } catch (err) {
            throw new ServerError(err);
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            return await User.findOne({ email });
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    public async isEmailExists(email: string): Promise<UserDocument | null> {
        try {
            return await User.findOne({ email: email });
        } catch (err) {
            throw new ServerError(err.message);
        }
    }
}

export default new UserModel();
