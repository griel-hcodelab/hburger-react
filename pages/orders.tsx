import { NextPage } from "next"
import Button from "../Components/Button";
import { Header } from "../Components/Header"
import { Title } from "../Components/Title";

const Orders: NextPage = () => {
    return (
        <>
            <Header />
            <main>
                <Title text={<h1>Meus Pedidos</h1>} />
                <div id="alert">
                </div>
                {/* <a href="/" className="btnBack" style={{ marginLeft: '20px', width: '270px' }}>QUER MAIS UM H-BURGER?</a> */}
                <Button tag="a" href="/" value="QUER MAIS UM H-BURGER?" />
                <ul id="list-orders">
                    <li>
                        <div className="confirm item202221019560" data-time="1646953060">

                            <p>Você quer mesmo apagar este pedido?</p>
                            <div className="wrap">
                                <button type="button" className="confirmYes 202221019560">Sim, eu quero apagar</button>

                                <button type="button" className="confirmNo 202221019560">Pensando bem, deixe ele aí...</button>

                            </div>

                        </div>
                        <div className="id">202221019560</div>
                        <div className="content">
                            <div className="title">Detalhes do Pedido</div>
                            <ul>
                                <li>
                                    <span>Data:</span>
                                    <span>10/3/2022</span>
                                </li>
                                <li>
                                    <span>Valor:</span>
                                    <span>R$&nbsp;92,00</span>
                                </li>
                                <li>
                                    <span>Itens:</span>
                                    <span>2</span>
                                </li>
                                <li>
                                    <span>N°:</span>
                                    <span>202221019560</span>
                                </li>
                            </ul>
                        </div>
                        <div className="actions" id="act202221019560">
                            <button type="button" id="delete202221019560" aria-label="Excluir">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#070D0D"></path>
                                </svg>
                            </button>
                        </div>
                    </li>
                </ul>
            </main>
        </>
    )
}


export default Orders;

