/* eslint-disable react-hooks/exhaustive-deps */
import { addMonths, format } from "date-fns";
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { Header } from "../Components/Header";
import { Title } from "../Components/Title";
import { isCNPJ } from "../utils/isCNPJ";
import { isCPF } from "../utils/isCPF";
import { get } from 'lodash'
import axios from "axios";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../utils/session";
import { Order } from "../Types/Orders/OrderType";
import { useAuth } from "../Context/AuthContext";

type CarteType = {
    installments: number;
    cardToken: number;
    paymentMethod: string;
    document: string;
    cardFirstSixDigits: string;
    cardLastFourDigits: string;
    situationPayment: string;
    paymentTypeId: string;
    cardName: string;
    data?: CarteType;
}


type FormData = {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
    bank: string;
    installments: string;
    cardDocument: string;
    token: string;
    server?: string;
    situationPayment: string;
    cardName: string
}

type Issuer = {
    id: string;
    name: string;
}

type InstallmentOptions = {
    number: number;
    value: number;
    description: string;
}

declare var MercadoPago: any;

type ComponentPageProps = {
    amount: string;
    orderId: number;
}



const ComponentPage: NextPage<ComponentPageProps> = ({ amount, orderId }) => {
    const router = useRouter();

    const { token } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
        formState: {
            errors
        },
        watch,
    } = useForm<FormData>()

    const number = watch("number")
    const [mp, setMp] = useState<any>(null)
    const [bin, setBin] = useState('')
    const name = watch("name")
    const cardName = watch("cardName")
    const expiry = watch("expiry")
    const cvv = watch("cvv")
    const installments = watch("installments")
    const cardDocument = watch("cardDocument")
    const [issuers, setIssuers] = useState<Issuer[]>([])
    const [installmentOptions, setInstallmentOptions] = useState<InstallmentOptions[]>([])
    const [paymentMethodId, setPaymentMethodId] = useState('');
    const [paymentTypeId, setPaymentTypeId] = useState('');

    const initMercadoPago = () => {

        setMp(new MercadoPago(process.env.MERCADOPAGO_KEY, {
            language: 'pt-BR'
        }))

    }

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            if (mp) {
                setValue('number', '4235647728025682');
                setValue('cardName', 'Fulano de Tal');
                setValue('name', 'APRO');
                setValue('expiry', format(addMonths(new Date(), 1), 'MM/yyyy'));
                setValue('cvv', '123');
                setValue('cardDocument', '12345678909');
            }
        }
    }, [mp]);


    useEffect(() => {
        if (number && number.length >= 6 && number.substring(0, 6) !== bin) {
            setBin(number.substring(0, 6));
        }
    }, [number]);

    useEffect(() => {
        if (mp && bin) {

            mp.getInstallments({
                bin,
                amount,
                locale: 'pt-BR',
            }).then((response: any) => {

                const info = response[0]

                setPaymentMethodId(info.payment_method_id)
                setPaymentTypeId(info.payment_type_id)
                setValue('installments', '1')

                setInstallmentOptions(info.payer_costs.map(
                    (cost: any) => ({
                        number: cost.installments,
                        value: cost.amount,
                        description: cost.recommended_message
                    })))



            }).catch((error: any) => {
                console.log(error);

            })
        }

    }, [bin])

    useEffect(() => {
        if (bin && paymentMethodId) {
            mp.getIssuers({
                bin,
                paymentMethodId
            }).then((response: any) => {
                setIssuers(response.map((issuer: any) => ({
                    id: issuer.id,
                    name: issuer.name
                })))
            }).catch((errors: any) => {
                console.log(errors);
            })
        }
    }, [bin, paymentMethodId])

    useEffect(() => {
        console.log(errors);

    }, [errors])

    useEffect(() => {

        const script: HTMLScriptElement = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.onload = initMercadoPago;

        document.body.appendChild(script)
    }, [])

    const onSubmit: SubmitHandler<FormData> = async (data) => {


        const expirtyMonth = Number(expiry.split('/')[0]);
        const expirtyYear = Number(expiry.split('/')[1]);

        if (expirtyMonth < 0 && expirtyMonth > 12) {
            setError('expiry', {
                message: 'Mês de vencimento inválido'
            });
            return;
        }

        if (expirtyYear < new Date().getFullYear()) {
            setError('expiry', {
                message: 'Ano de vencimento inválido'
            });
            return;
        }

        if (number.length < 15) {
            setError('number', {
                message: 'Número de cartão inválido'
            });
            return;
        }

        if (cvv.length < 3) {
            setError('cvv', {
                message: 'CVV inválido'
            });
            return;
        }

        if (!isCPF(cardDocument) && !isCNPJ(cardDocument)) {
            setError('cardDocument', {
                message: 'CPF ou CNPJ inválido'
            });
            return;
        }

        try {
            await axios.patch(`${process.env.API_URL}/orders/${orderId}`,  {
                payment_situation_id: 3,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            router.push(`/orders`); 
        }
        catch (error: any) {
            console.error(error.message)
        }   

    }

    return (
        <section>
            <Header />
            <main>
                <Title text={<h1>Pagamento</h1>} />
                <section>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div id="alert">

                        </div>

                        {/* <input type="hidden" id="name" {...register('name', {
                           
                        })} /> */}

                        <div className="field">
                            <IMaskInput
                                mask={'0000 0000 0000 0000'}
                                unmask={true}
                                value={number}
                                placeholder={'(ex:1234 5678 8765 4321)'}
                                onAccept={(value) => setValue('number', String(value))}
                            />
                            <label htmlFor="number">Número do Cartão</label>
                        </div>

                        <div className="fields">
                            <div className="field">
                                <IMaskInput
                                    mask={'00/0000'}
                                    unmask={false}
                                    value={expiry}
                                    placeholder={'(ex:MM/AAAA)'}
                                    onAccept={(value) => setValue('expiry', String(value))}
                                />
                                <label htmlFor="expiry">Data Validade</label>
                            </div>
                            <div className="field">
                                <IMaskInput
                                    mask={'000[0]'}
                                    unmask={true}
                                    value={cvv}
                                    onAccept={(value) => setValue('cvv', String(value))}
                                />
                                <label htmlFor="expiry">Código de Segurança</label>
                            </div>
                        </div>

                        <div className="field">
                            <input type="text" id="card-name" placeholder="Digite o nome impresso no cartão" {...register('name', {
                                required: 'Digite o nome impresso no cartão.'
                            })} />
                            <label htmlFor="expiry">Nome Titular Cartão</label>
                        </div>

                        {issuers.length > 1 && <div className="field">
                            <select id="issuers" {...register('bank', {
                                required: 'Selecione o Banco'
                            })}>
                                {issuers.map(({ id, name }, index) => (
                                    <option key={index} value={id}>{name}</option>
                                ))}
                            </select>
                            <label htmlFor="issuers">Banco Emissor</label>
                        </div>}
                        <div className="field">
                            <select disabled={installmentOptions.length === 0}
                                id="installments" {...register('installments', {
                                    required: 'Selecione a quantidade de parcelas.'
                                })}>
                                {installmentOptions.map(({ description, number }, index) => (
                                    <option key={index} value={number}>{description}</option>
                                ))}
                            </select>
                            <label htmlFor="installments">Parcelas</label>
                        </div>

                        <div className="field">
                            <IMaskInput
                                id="card-document"
                                mask={[{
                                    mask: '000.000.000-00'
                                }, {
                                    mask: '00.000.000/0000-00'
                                }]}
                                unmask={true}
                                value={cardDocument}
                                onAccept={(value) => setValue('cardDocument', String(value))}
                            />
                            <label htmlFor="card-document">CPF ou CNPJ do Titular do Cartão</label>
                        </div>


                        <div id="alert">
                            {Object.keys(errors).map((error) => (
                                get(error, `${error}.message`, 'Verifique os dados selecionados')
                            ))}
                        </div>
                        <footer>
                            <button type="submit" id="paymentBtn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 2H7C5.9 2 5 2.9 5 4V6C5 7.1 5.9 8 7 8H17C18.1 8 19 7.1 19 6V4C19 2.9 18.1 2 17 2ZM17 6H7V4H17V6ZM20 22H4C2.9 22 2 21.1 2 20V19H22V20C22 21.1 21.1 22 20 22ZM18.53 10.19C18.21 9.47 17.49 9 16.7 9H7.3C6.51 9 5.79 9.47 5.47 10.19L2 18H22L18.53 10.19ZM9.5 16H8.5C8.22 16 8 15.78 8 15.5C8 15.22 8.22 15 8.5 15H9.5C9.78 15 10 15.22 10 15.5C10 15.78 9.78 16 9.5 16ZM9.5 14H8.5C8.22 14 8 13.78 8 13.5C8 13.22 8.22 13 8.5 13H9.5C9.78 13 10 13.22 10 13.5C10 13.78 9.78 14 9.5 14ZM9.5 12H8.5C8.22 12 8 11.78 8 11.5C8 11.22 8.22 11 8.5 11H9.5C9.78 11 10 11.22 10 11.5C10 11.78 9.78 12 9.5 12ZM12.5 16H11.5C11.22 16 11 15.78 11 15.5C11 15.22 11.22 15 11.5 15H12.5C12.78 15 13 15.22 13 15.5C13 15.78 12.78 16 12.5 16ZM12.5 14H11.5C11.22 14 11 13.78 11 13.5C11 13.22 11.22 13 11.5 13H12.5C12.78 13 13 13.22 13 13.5C13 13.78 12.78 14 12.5 14ZM12.5 12H11.5C11.22 12 11 11.78 11 11.5C11 11.22 11.22 11 11.5 11H12.5C12.78 11 13 11.22 13 11.5C13 11.78 12.78 12 12.5 12ZM15.5 16H14.5C14.22 16 14 15.78 14 15.5C14 15.22 14.22 15 14.5 15H15.5C15.78 15 16 15.22 16 15.5C16 15.78 15.78 16 15.5 16ZM15.5 14H14.5C14.22 14 14 13.78 14 13.5C14 13.22 14.22 13 14.5 13H15.5C15.78 13 16 13.22 16 13.5C16 13.78 15.78 14 15.5 14ZM15.5 12H14.5C14.22 12 14 11.78 14 11.5C14 11.22 14.22 11 14.5 11H15.5C15.78 11 16 11.22 16 11.5C16 11.78 15.78 12 15.5 12Z" fill="white" />
                                </svg>
                                Salvar Hamburguer
                            </button>
                        </footer>
                    </form>
                </section>
            </main>
        </section>
    );
}

export default ComponentPage;


export const getServerSideProps = withIronSessionSsr(async ({ req }: GetServerSidePropsContext) => {

    const { data } = await axios.get<Order>(`/orders/${req.session.order.order}`, {
        baseURL: process.env.API_URL,
        headers: {
            'Authorization': `Bearer ${req.session.token}`
        },
        params: {
            amount: req.session.order.total,
            orderId: req.session.order.order
        }
    });

    return {
        props: {
            amount: String(data.total), orderId: data.id
        } as ComponentPageProps,

    }
}, sessionOptions)