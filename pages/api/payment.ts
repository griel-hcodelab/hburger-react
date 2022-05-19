import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { BurguerCreate } from "../../Types/BurguerCreate";
import { sessionOptions } from "../../utils/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        

        const {
            cardToken,
            installments,
            paymentMethod,
            cardDocument
        } = req.body
        const data = {
            id: 1,
            address_id: 1,
            observations: 'Sem Cebola', 
            payment_situation_id: 1,
            person_id: 1,
            total: 90.00,
            cardToken,
            installments,
            document: cardDocument,
            paymentMethod
        } as BurguerCreate;

        if (!cardToken) {
            res.status(400).send({
                message: 'Informe o token do cartão'
            })
        }
    
        if (!installments) {
            res.status(400).send({
                message: 'Informe as parcelas'
            })
        }

        const response = await axios.patch<BurguerCreate>(`/orders/${data.id}`, data, {
            baseURL: process.env.API_URL,
            headers: {
                'Authorization': `Bearer ${req.session.token}`
            }
        });

        res.status(200).json(response.data)
        
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        })
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)