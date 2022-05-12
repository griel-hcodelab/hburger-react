import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { TokenResponse } from '../Types/Auth/TokenResponse';

export function apiTokenResponse<T extends TokenResponse>(url: string) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { data } = await axios.post<T>(url, req.body, {
        baseURL: process.env.API_URL,
      });

      req.session.token = data.token;

      await req.session.save();

      res.status(200).json(data);
    } catch (error: any) {
      res
        .status(error.response.data.statusCode)
        .json({ message: error.response.data.message });
    }
  };
}
