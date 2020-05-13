import bcrypt from 'bcrypt';
import ServerError from '../errors/server.error';

class CryptographyService {
    async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    async comparePasswords(password: string, userPassword: string): Promise<boolean> {
        return bcrypt.compare(password, userPassword).then((result) => {
            return result;
        });
    }
}

export default new CryptographyService();
