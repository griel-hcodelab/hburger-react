import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/session";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{



    const get = async ()=>{
        try {
    
            await axios.get(`${process.env.API_URL}/login/me`, {
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

    const patch = async ()=>{
        const {body} = req.body;
            
            body.birthAt = body.birth_at.split('/').reverse().join('-');
            body.document = body.document.replace(/\D/g, '');
            body.phone = body.phone.replace(/\D/g, '');

            delete body.birth_at;
    
            await axios.patch(`${process.env.API_URL}/login`, body, {
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


    switch(req.method){

        case "GET":
            await get();
        break;
        case "PATCH":
            await patch();

    }

}

export default withIronSessionApiRoute(handler, sessionOptions);