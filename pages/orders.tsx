import axios from "axios";
import { NextPage } from "next"
import { useEffect, useState } from "react";
import Button from "../Components/Button";
import { Header } from "../Components/Header"
import { MetaTitle } from "../Components/Header/MetaTitle";
import { Title } from "../Components/Title";
import { OrderCard } from "../Components/Order/Card";
import { Order } from "../Types/Orders/OrderType";

type PaymentSituation = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Orders: NextPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getPaymentSituationName = (id: number, paymentSituations: PaymentSituation[]) => {    
    return paymentSituations.find((situation) => situation.id === id)?.name;
  }

  const getOrders = () => {
    axios.get('/api/orders')
    .then(async ({ data: orders }) => {

      const { data } = await axios.get('/payment-situations', {
        baseURL: process.env.API_URL,
      });      

      setOrders(orders.map((order: Order) => ({
        ...order,
        paymentSituationName: getPaymentSituationName(order.payment_situation_id, data)
      })));
    });
  };

  useEffect(getOrders, []);

  return (
    <>
      <MetaTitle title="Seus Pedidos :: HBurger" />
      <section>
        <Header />
        <main>
          <Title text={<h1>Meus Pedidos</h1>} />
          <Button tag="a" href="/" value="QUER MAIS UM H-BURGER?" />
          <ul id="list-orders">
            {orders.map((order) => <OrderCard key={order.id} order={order} onCancel={getOrders} />)}
          </ul>
        </main>
      </section>
    </>
  );
};

export default Orders;
