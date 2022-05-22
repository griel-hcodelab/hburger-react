import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/session";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{

    const {body} = req.body;

    const post = async ()=>{

        console.log('chegou no post')

        try {

            await axios.get(`/addresses/${body.id}`, {
                baseURL: process.env.API_URL,
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

    const update = async ()=>{

        console.log('chegou no update')

        await axios.patch(`${process.env.API_URL}/addresses/${body.id}`, body, {
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

    }


    switch(req.method) {
        case 'POST':
            await post();
        break;
        case 'PATCH':
            await update();
        break;
    }




}

export default withIronSessionApiRoute(handler, sessionOptions);