import { User, UserDocument } from './schemas/user.schema';
import ServerError from '../errors/server.error';
import { UserInterface } from '../interfaces/user.interface';

class UserModel {

    public async create(user: Omit<UserInterface, 'tasks' | 'assignedTasks'>): Promise<UserDocument> {
        const {email, password, name} = user;
        try {
            const newUser = await User.create({email, password, name});
            return newUser;
        } catch (err) {
            throw new ServerError(err);
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            const user = User.findOne({ email });
            return user;
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    public async isEmailExists(email: string): Promise<UserDocument | null> {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (err) {
            throw new ServerError(err.message);
        }
    }
}

export default new UserModel();
