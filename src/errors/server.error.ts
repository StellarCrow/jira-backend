class ServerError extends Error {
    constructor(args: string) {
        super(args);
        this.name = 'ServerError';
    }
}

export default ServerError;
