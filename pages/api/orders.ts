import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../utils/session";

export default withIronSessionApiRoute(async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get('/orders/me', {
      baseURL: process.env.API_URL,
      headers: {
        'Authorization': `Bearer ${req.session.token}`
      },
    });

    res.status(200).json(data);

  } catch (e: any) {
    res.status(400).json({
      message: e.message,
    });
  }
}, sessionOptions);