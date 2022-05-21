import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/session";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{

    const {body} = req.body;

    console.log(req.method)

    const post = async ()=>{

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

        console.log(body.id)

        await axios.patch(`/addresses/${body.id}`, {
            baseURL: process.env.API_URL,
            headers: {
                'Authorization': `Bearer ${req.session.token}`
            },
            body
        })
        .then(({data})=>{
            return res.status(200).json(data);
        })


        // try {

            
    
           

        // } catch (e:any) {
        //     res.status(e.response.status);
        // }


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