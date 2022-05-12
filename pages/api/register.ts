import { withIronSessionApiRoute } from 'iron-session/next';
import { apiTokenResponse } from '../../utils/apiTokenResponse';
import { sessionOptions } from '../../utils/session';

export default withIronSessionApiRoute(
  apiTokenResponse('/login'),
  sessionOptions,
);
