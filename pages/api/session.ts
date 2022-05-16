import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../utils/session';
import axios from 'axios';
import { MeResponse } from '../../Types/Auth/MeResponse';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.session;

  if (token) {
    const { data } = await axios.get<MeResponse>('/login/me', {
      baseURL: process.env.API_URL,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const user = {
      id: data.id,
      email: data.email,
      personId: data.Person[0].id,
      name: data.Person[0].name,
      photo: data.Person[0].photo,
      birthAt: data.Person[0].birthAt,
      document: data.Person[0].document,
      phone: data.Person[0].phone,
    };

    req.session.user = user;

    await req.session.save();

    res.status(200).send({
      token,
      user,
    });
  } else {
    req.session.destroy();
    await req.session.save();
    res.status(401).send({ message: 'Unauthenticated.' });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
