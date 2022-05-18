import axios from "axios";
import FormData from 'form-data';
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../utils/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { data } = req.body;

        const json = JSON.parse(data);

        const products: string[] = [];
        const aditions_itens: number[] = [];

        json.forEach((item: any) => {
            products.push(item.burger.id)
            aditions_itens.push(item.aditional.map(({ id }: { id: number }) => +id).join(','));
        });

        const form:any = {
            products: products.join(),
            aditions_itens: aditions_itens.join('|')
        }

        const formData = new FormData()
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key])
        })

        await axios.post('/orders', form, {
            baseURL: process.env.API_URL,
            headers: {
                'Authorization': `Bearer ${req.session.token}`
            }
        })
        .then(()=>{
            res.status(200);
        })
        .catch((e:any)=>{
            res.status(e.response.status);
        })
        ;


    } catch (e: any) {

        res.status(400).json({
            message: e.message,
        });

    }
};


export default withIronSessionApiRoute(handler, sessionOptions);