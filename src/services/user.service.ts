import UserModel from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';

class UserService {
    public async getUsers(): Promise<UserInterface[]> {
        return await UserModel.getAllUsers();
    }
}

export default new UserService();
