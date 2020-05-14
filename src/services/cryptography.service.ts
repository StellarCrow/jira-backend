import bcrypt from 'bcrypt';
import ServerError from '../errors/server.error';

class CryptographyService {
    public async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    public async comparePasswords(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword).then((result) => {
            return result;
        });
    }
}

export default new CryptographyService();
