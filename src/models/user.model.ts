import { User, UserDocument } from './schemas/user.schema';
import ServerError from '../errors/server.error';

class UserModel {

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
