const { NODE_ENV, JWT_SECRET = 'dev secret' } = process.env;

export const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

export default {};
