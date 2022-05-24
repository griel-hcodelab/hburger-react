import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Header } from '../Components/Header';
import { MetaTitle } from '../Components/Header/MetaTitle';
import { Toast } from '../Components/Toast';
import AuthContext from '../Context/AuthContext';
import { TypeAddresses } from '../Types/Addresses';
import { getZipcode } from '../utils/getZipcode';

export default function NewAddressPage<NextPage>() {
    const router = useRouter();

    const [address, setAddress] = useState<TypeAddresses>();
    const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const [toastError, setToastError] = useState('');

    const zipcode = async (e: string) => {
        const result = await getZipcode(e);

        setAddress(result);
    };

    const setAddressData = (address: TypeAddresses) => {
        if (address.zipcode) {
            setValue(
                'zipcode',
                address?.zipcode.replace('-', '').replace('.', ''),
            );
        }

        setValue('street', address?.street);
        setValue('number', address?.number);
        setValue('complement', address?.complement);
        setValue('district', address?.district);
        setValue('city', address?.city);
        setValue('state', address?.state);
    };

    useEffect(() => {
        if (address) {
            setAddressData(address);
        }
    }, [address]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TypeAddresses>({
        defaultValues: {
            zipcode: address?.zipcode,
            street: address?.street,
            number: address?.number,
            complement: address?.complement,
            district: address?.district,
            city: address?.city,
            state: address?.state,
        },
    });

    useEffect(() => {
        if (Object.keys(errors).length) {
            showErrorToast(
                Object.values(errors)[0].message ||
                    'Verifique o endereço e tente novamente.',
            );
        } else {
            setToastIsOpen(false);
        }
    }, [errors]);

    const onSubmit: SubmitHandler<TypeAddresses> = async (data) => {
        await axios
            .post(`/api/new-address`, {
                body: data,
            })
            .then(({ data }) => {
                router.push('/addresses');
            })
            .catch((e: any) => {
                showErrorToast(e.message);
            });
    };

    const showErrorToast = (message: string) => {
        setToastError(message);
        setToastType('danger');
        setToastIsOpen(true);

        setTimeout(() => {
            setToastIsOpen(false);
        }, 5000);
    };

    return (
        <>
            <AuthContext>
                <MetaTitle title="Atualizar Endereço :: HBurger" />

                <section>
                    <Header />
                    <main>
                        <h1>Cadastre um novo endereço de entrega</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="field">
                                <IMaskInput
                                    placeholder="Digite aqui seu CEP"
                                    id="zipcode"
                                    mask={'00.000-000'}
                                    {...register('zipcode', {
                                        required: 'Por favor, informe seu CEP',
                                    })}
                                    onBlur={async (e) => {
                                        await zipcode(e.target.value);
                                    }}
                                />
                                <label htmlFor="zipcode">CEP</label>
                            </div>

                            <div className="field">
                                <input
                                    placeholder="Digite aqui seu endereço"
                                    type="text"
                                    id="address"
                                    {...register('street', {
                                        required:
                                            'Por favor, informe seu endereço',
                                    })}
                                />
                                <label htmlFor="address">Endereço</label>
                            </div>

                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Digite aqui o número, se houver"
                                    id="number"
                                    {...register('number')}
                                />
                                <label htmlFor="number">Número</label>
                            </div>

                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Digite aqui seu bairro"
                                    id="district"
                                    {...register('district', {
                                        required:
                                            'Por favor, informe seu bairro',
                                    })}
                                />
                                <label htmlFor="district">Bairro</label>
                            </div>

                            <div className="fields">
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Digite aqui sua cidade"
                                        id="city"
                                        {...register('city', {
                                            required:
                                                'Por favor, informe sua cidade',
                                        })}
                                    />
                                    <label htmlFor="city">Cidade</label>
                                </div>

                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Digite aqui seu estado"
                                        id="state"
                                        {...register('state', {
                                            required:
                                                'Por favor, informe seu estado',
                                        })}
                                    />
                                    <label htmlFor="state">Estado</label>
                                </div>

                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Digite aqui seu país"
                                        id="country"
                                        {...register('country', {
                                            required:
                                                'Por favor, informe seu país',
                                        })}
                                        defaultValue={'Brasil'}
                                    />
                                    <label htmlFor="country">País</label>
                                </div>
                            </div>

                            <div id="alert"></div>

                            <footer>
                                <button type="submit">Salvar</button>
                            </footer>
                        </form>
                    </main>
                </section>

                <Toast type={toastType} open={toastIsOpen}>
                    <p>{toastError}</p>
                </Toast>
            </AuthContext>
        </>
    );
}
