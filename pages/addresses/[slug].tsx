import axios from "axios";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { Header } from "../../Components/Header";
import { MetaTitle } from "../../Components/Header/MetaTitle";
import AuthContext from '../../Context/AuthContext'
import { TypeAddresses } from "../../Types/Addresses";
import { getZipcode } from "../../utils/getZipcode";

type SlugProps = {

    slug: string

}

const ComponentPage: NextPage<SlugProps> = ({ slug }) => {

    const router = useRouter();

    const [address, setAddress] = useState<TypeAddresses>();

    const zipcode = async (e: string) => {

        const result = await getZipcode(e);

        setAddress(result)
    }

    const getAddressData = async () => {
        await axios.post('/api/update-address', {
            body: {
                id: slug
            }
        })
            .then(({ data }) => {
                setAddress(data)
                setAddressData(data)

            })
    }

    const setAddressData = (address: TypeAddresses) => {

        if (address.zipcode){
            setValue("zipcode", address?.zipcode.replace('-', '').replace('.', ''));
        }

        setValue("street", address?.street);
        setValue("number", address?.number);
        setValue("complement", address?.complement);
        setValue("district", address?.district);
        setValue("city", address?.city);
        setValue("state", address?.state);
    }

    useEffect(() => {
        getAddressData()
    }, [])

    useEffect(() => {
        if (address) {
            setAddressData(address)
        }
    }, [address])

    const { register, handleSubmit, getValues, setValue } = useForm<TypeAddresses>({
        defaultValues: {
            zipcode: address?.zipcode,
            street: address?.street,
            number: address?.number,
            complement: address?.complement,
            district: address?.district,
            city: address?.city,
            state: address?.state,
        }
    })

    const onSubmit: SubmitHandler<TypeAddresses> = async (data) => {

        data.id = Number(slug);

        await axios.patch(`/api/update-address`, {
            body: data
        })
        .then(({data})=>{
            router.push("/addresses")
        })
        .catch((e:any)=>{
            console.log(e.message)
        }) 


    }

    return (
        <>
            <AuthContext>
                <MetaTitle title="Atualizar Endereço :: HBurger" />

                <section>
                    <Header />
                    <main>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="field">
                                <IMaskInput id="zipcode" defaultValue={address?.zipcode} mask={'00.000-000'} {...register('zipcode', {
                                    required: 'Por favor, informe seu CEP',
                                })} onBlur={async (e) => { await zipcode(e.target.value) }} />
                                <label htmlFor="zipcode">CEP</label>
                            </div>

                            <div className="field">
                                <input type="text" id="address" {...register('street', {
                                    required: 'Por favor, informe seu endereço',
                                    value: address?.street
                                })} defaultValue={address?.street} />
                                <label htmlFor="address">Endereço</label>
                            </div>

                            <div className="field">
                                <input type="text" id="number" {...register('number')} defaultValue={address?.number} />
                                <label htmlFor="number">Número</label>
                            </div>

                            <div className="field">
                                <input type="text" id="district" {...register('district', {
                                    required: 'Por favor, informe seu bairro',
                                })} defaultValue={address?.district} />
                                <label htmlFor="district">Bairro</label>
                            </div>

                            <div className="fields">

                                <div className="field">
                                    <input type="text" id="city" {...register('city', {
                                        required: 'Por favor, informe sua cidade',
                                    })} defaultValue={address?.city} />
                                    <label htmlFor="city">Cidade</label>
                                </div>

                                <div className="field">
                                    <input type="text" id="state" {...register('state', {
                                        required: 'Por favor, informe seu estado',
                                    })} defaultValue={address?.state} />
                                    <label htmlFor="state">Estado</label>
                                </div>

                            </div>

                            <div id="alert"></div>

                            <footer>

                                <button type="submit">Salvar</button>

                            </footer>

                        </form>
                    </main>
                </section>

            </AuthContext>
        </>
    )

}

export default ComponentPage;


export function getServerSideProps({ params }: GetServerSidePropsContext<SlugProps>) {

    if (params) {

        const { slug } = params;

        return {
            props: {
                slug
            }
        }

    } else {
        return {
            redirect: {
                destination: '/addresses'
            }
        }
    }



}