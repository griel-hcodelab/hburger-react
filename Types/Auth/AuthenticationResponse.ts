import { User } from "./User";

export type AuthenticationResponse = {
  token: string;
  user: User;
};
