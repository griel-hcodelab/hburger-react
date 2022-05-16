import { withIronSessionApiRoute } from "iron-session/next/dist";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../utils/session";

export default withIronSessionApiRoute(async function (req: NextApiRequest, res: NextApiResponse) {

    try {

        console.log(req.body.order)

    } catch (e: any) {

        res.status(400).json({
            message: e.message,
        });

    }

}, sessionOptions)