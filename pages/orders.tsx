import axios from "axios";
import { NextPage } from "next"
import { useEffect, useState } from "react";
import Button from "../Components/Button";
import { Header } from "../Components/Header"
import { MetaTitle } from "../Components/Header/MetaTitle";
import { Title } from "../Components/Title";
import { OrderCard } from "../Components/Order/Card";
import { Order } from "../Types/Orders/OrderType";
import styled from "styled-components";

const NewButtonDiv = styled.div`
    display: flex;
    align-items: center;
`

const Orders: NextPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = () => {
    axios.get('/api/orders')
    .then((response) => {
      setOrders(response.data);
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
          <NewButtonDiv>
            <Button tag="a" href="/" value="QUER MAIS UM H-BURGER?" />
          </NewButtonDiv>
          <ul id="list-orders">
            {orders.map((order) => <OrderCard key={order.id} order={order} onCancel={getOrders} />)}
          </ul>
        </main>
      </section>
    </>
  );
};

export default Orders;
