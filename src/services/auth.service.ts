import UserModel from '../models/user.model';
import CryptographyService from './cryptography.service';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserInterface } from '../interfaces/user.interface';

dotenv.config();

class AuthService {
    private JWT_SECRET = process.env.JWT_SECRET || "123";

    public async registrate(user: Omit<UserInterface, 'tasks' | 'assignedTasks' | '_id'>): Promise<Omit<UserInterface, 'password'>> {
        const { email, password } = user;
        const isEmailExists = await UserModel.isEmailExists(email);
        if (isEmailExists) {
            throw new Error('This email is already exist in the system.');
        }
        try {
            const hashedPassword = await CryptographyService.hashPassword(password);
            user.password = hashedPassword;
        } catch (err) {
            throw new Error('Error while hashing password.');
        }
        const newUser = await UserModel.create(user);
        const userPasswordRemoved = newUser.toObject();
        delete userPasswordRemoved.password;
        return userPasswordRemoved;
    }

    public async login(credentials: Pick<UserInterface, 'email' | 'password'>): Promise<{ token: string, user: Omit<UserInterface, 'password'> }> {
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
            id: user._id,
            email: user.email,
            name: user.name,
        };
        const jwtToken = jwt.sign(payload, this.JWT_SECRET);
        const userPasswordRemoved = user.toObject();
        delete userPasswordRemoved.password;
        return { token: jwtToken, user: userPasswordRemoved };
    }
}

export default new AuthService();
