import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/session";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{

    const {body} = req.body;

    console.log(body.id)

    try {

        await axios.delete(`${process.env.API_URL}/addresses/${body.id}`, {
            headers: {
                'Authorization': `Bearer ${req.session.token}`
            } 
        })
        .then(({data})=>{
            return res.status(200).json(data);
        })
        .catch((e:any)=>{
            res.status(e.response.status);
        })
        
    } catch (e) {
        console.log(e)
    }


}

export default withIronSessionApiRoute(handler, sessionOptions);