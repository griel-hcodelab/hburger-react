import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { Order } from "../../../Types/Orders/OrderType";
import { formatPrice } from "../../../utils/formatPrice";

type OrderCardProps = {
  order: Order;
  onCancel: () => void;
};

export const OrderCard = ({ order, onCancel } : OrderCardProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [canDeleteOrder, setCanDeleteOrder] = useState(true);
  const [paymentSituationName, setPaymentSituationName] = useState('');

  const { token } = useAuth();

  const formatOrderId = (): string => {
    return `${format(new Date(order.createdAt), 'yyyyMMdd')}${String(order.id).padStart(4, '0')}`;
  };

  const getPaymentSituationName = () => {
    axios.get(`payment-situations/${order.payment_situation_id}`, {
      baseURL: process.env.API_URL,
    })
    .then((response) => {
      setPaymentSituationName(response.data.name);
      setCanDeleteOrder([1, 2, 3, 4, 5].includes(order.payment_situation_id));
    });
  };

  const cancelOrder = () => {
    axios.delete(`/orders/${order.id}`, {
      baseURL: process.env.API_URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(onCancel)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setShowAlert(false));
  };

  useEffect(getPaymentSituationName, [order]);

  return (
    <li className={showAlert ? 'show-confirm' : ''}>
      <div className="confirm">
        <p>Deseja mesmo cancelar este pedido?</p>
        <div className="wrap">
          <button type="button" className="confirmYes 202221019560"
            onClick={cancelOrder}
          >Sim, eu quero cancelar</button>
          <button type="button" className="confirmNo 202221019560"
            onClick={() => setShowAlert(false)}
          >Pensando bem, deixe ele aí...</button>
        </div>
      </div>
      <div className="id">{formatOrderId()}</div>
      <div className="content">
        <div className="title">Detalhes do Pedido</div>
        <ul>
          <li>
            <span>Data:</span>
            <span>{format(new Date(order.createdAt), 'dd/MM/yyyy')}</span>
          </li>
          <li>
            <span>Status:</span>
            <span>{paymentSituationName}</span>
          </li>
          <li>
            <span>Valor:</span>
            <span>{formatPrice(+order.total)}</span>
          </li>
          <li>
            <span>Itens:</span>
            <span>2</span>
          </li>
          <li>
            <span>N°:</span>
            <span>{formatOrderId()}</span>
          </li>
        </ul>
      </div>
      <div className="actions">
        { canDeleteOrder && <button type="button" aria-label="Excluir" onClick={() => setShowAlert(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#070D0D"></path>
          </svg>
        </button> }
      </div>
    </li>
  );
};
