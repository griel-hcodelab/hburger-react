import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { RegisterResponse } from '../../Types/Auth/RegisterResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await axios.post<RegisterResponse>('/login', req.body, {
      baseURL: process.env.API_URL,
    });

    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(error.response.data.statusCode)
      .json({ message: error.response.data.message });
  }
}
