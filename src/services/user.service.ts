import UserModel from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';

class UserService {
    public async getUsers(): Promise<UserInterface[]> {
        return await UserModel.getAllUsers();
    }

    public async getUser(id: string): Promise<UserInterface | null> {
        return await UserModel.getUser(id);
    }
}

export default new UserService();
