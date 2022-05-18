import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../utils/session';
import { apiTokenResponse } from '../../utils/apiTokenResponse';

export default withIronSessionApiRoute(
  apiTokenResponse('/login/auth'),
  sessionOptions,
);
