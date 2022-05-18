import { IronSessionOptions } from 'iron-session';
import { User } from '../Types/Auth/User';

export const sessionOptions: IronSessionOptions = {
  cookieName: 'ferrari-hcodelab/iron-session',
  password: String(process.env.COOKIE_SECRET_KEY),
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    token: string;
    user: User;
  }
}
