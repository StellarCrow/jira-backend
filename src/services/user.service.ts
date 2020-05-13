import UserModel from '../models/user.model';
import CryptographyService from './cryptography.service';
import { Secret, sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserService {
    private JWT_SECRET = process.env.JWT_SECRET || "123";

    async login(credentials: any) {
        const { email, password } = credentials;
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Wrong email');
        }
        const match = await CryptographyService.comparePasswords(
            password,
            user.password,
        );
        if (!match) {
            throw new Error('Wrong password');
        }
        const payload = {
            user_id: user._id,
            email: user.email,
        };
        const jwtToken = sign(payload, this.JWT_SECRET);
        const userPasswordRemoved = user.toObject();
        delete userPasswordRemoved.password;
        return { token: jwtToken, user: userPasswordRemoved };
    }
}

export default new UserService();
