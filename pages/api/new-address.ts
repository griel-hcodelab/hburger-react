import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/session";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{

    try {

        const {body} = req.body;

        await axios.post(`${process.env.API_URL}/addresses`, body, {
            headers: {
                'Authorization': `Bearer ${req.session.token}`
            }
        })
        .then(({data})=>{
            return res.status(200).json(data);
        })

    } catch (e:any) {
        res.status(e.response.status);
    }


}

export default withIronSessionApiRoute(handler, sessionOptions);