import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { BurguerCreate } from "../../Types/BurguerCreate";
import { CarteType } from "../../Types/CarteType";
import { Order } from "../../Types/Orders/OrderType";
import { PaymentCreate } from "../../Types/PaymentCreate";
import { sessionOptions } from "../../utils/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { order, person, address, total } = req.session.order

        const {
            cardToken,
            installments,
            paymentMethod,
            cardDocument,
            cardFirstSixDigits,
            cardLastFourDigits,
            situationPayment,
            paymentTypeId
        } = req.body
        const data = {
            order,
            person,
            address,
            total,
            cardToken,
            installments,
            document: cardDocument,
            paymentMethod,
        } as CarteType;

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

        const response = await axios.patch<PaymentCreate>(`/payment-situations`, data, {
            baseURL: process.env.API_URL,
            headers: {
                'Authorization': `Bearer ${req.session.token}`
            },
        });

        const payment = {
            ...(req.session.order ?? {}),
            cardFirstSixDigits,
            cardLastFourDigits,
            situationPayment,
            paymentTypeId,
            data
        }

        req.session.order = payment

        await req.session.save()

        console.log("payment-situations", response);


        res.status(200).json(response.data)

    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        })
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)