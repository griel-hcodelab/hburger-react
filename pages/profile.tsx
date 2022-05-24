import { NextPage } from "next";
import { Header } from "../Components/Header";
import React, { useEffect, useState } from "react";
import "cropperjs/dist/cropper.css";
import { MetaTitle } from "../Components/Header/MetaTitle";
import axios from "axios";
import router, { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import Link from "next/link";
import { Toast } from "../Components/Toast";
import { MeResponse } from "../Types/Auth/MeResponse";
import { redirectToAuth } from "../utils/redirectToAuth";
import { withAuthentication } from "../utils/withAuthentication";
import { User } from "../Types/Auth/User";
import { IMaskInput } from "react-imask";

type FormData = {
    name: string | undefined;
    birth_at?: string | undefined;
    document?: string | undefined;
    phone?: string | undefined;
}

type userData = {
    name?: string;
    birth_at?: string;
    document?: string;
    phone?: string;
}

type ComponentPageProps = {
    token: string;
    user: User;
}

const ComponentPage: NextPage<ComponentPageProps> = () => {

    const [userData, setUserData] = useState<userData>({});
    const { token, initAuth } = useAuth();

    const router = useRouter()

    const getUserData = async () => {

        await axios.get('/api/profile')
        .then(({data})=>{

            const userFromDB = {
                name: data.Person[0].name,
                birth_at: new Date(data.Person[0].birthAt).toISOString().split('T')[0].split('-').reverse().join('/'),
                document: data.Person[0].document,
                phone: data.Person[0].phone,
            }

            setUserData(userFromDB)
        })

    }

    useEffect(()=>{
        getUserData()
    },[])

    useEffect(()=>{
        setValue("name", userData?.name);
        setValue("birth_at", userData?.birth_at);
        setValue("document", userData?.document);
        setValue("phone", userData?.phone);
        
    },[userData])

    const [formIsLoading, setFormIsLoading] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
    const [toastIsOpen, setToastOpen] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<FormData>({
        defaultValues: {
            name: userData.name,
            birth_at: userData.birth_at ? userData.birth_at.substring(0, 10) : '',

        }
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        console.log('form', data)

        await axios.patch<User>(`/api/profile`, {
            body: data
        }).then(({ data }) => {
            setToastType('success');
            setError('Dados atualizados com sucesso. Você irá ser redirecionado para a página inicial.');
            setToastOpen(true);
            initAuth();
            setTimeout(() => {
                setToastOpen(false);
                router.push('/');
            }, 5000);
        }).catch((e) => {
            setToastType('danger');
            setError('server');
            setToastOpen(true);
        });
    }

    useEffect(() => {

        if (Object.keys(errors).length) {
            setToastType('danger');
            setToastOpen(true);
        } else {
            setToastOpen(false);
        }

    }, [errors]);
    
    
    return (
        <>
            <MetaTitle title="Meus Dados :: HBurger" />
                <section>
                    <Header />
                    <main>
                        <header className="page-title">
                            <h1>Dados <span>Pessoais</span></h1>
                        </header>
                        <form id="address-profile" onSubmit={handleSubmit(onSubmit)}>
                            <div className="field">
                                <input 
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: "O campo nome é obrigatório."
                                    })} 
                                />
                                <label htmlFor="name">Nome Completo</label>
                            </div>
                            <div className="field">
                                <IMaskInput mask={'00/00/0000'}  defaultValue={userData.birth_at}
                                    type="text"
                                    id="birth_at" 
                                    {...register("birth_at")} 
                                />
                                <label htmlFor="birth_at">Data de Nascimento</label>
                            </div>
                            <div className="fields">
                                <div className="field">
                                    <IMaskInput mask={'000.000.000-00'} defaultValue={userData.document}
                                        type="text"
                                        id="document" 
                                        {...register("document")}
                                    />
                                    <label htmlFor="document">CPF</label>
                                </div>
                                <div className="field">
                                    <IMaskInput mask={'(00) 00000-0000'} defaultValue={userData.phone} 
                                        type="text"
                                        id="phone" 
                                        {...register("phone")}
                                    />
                                    <label htmlFor="phone">Telefone</label>
                                </div>
                            </div>
                            <Toast type={toastType} open={toastIsOpen}>
                                <p>{error}</p>
                            </Toast>
                            <footer>
                            <button 
                                type="submit" 
                                disabled={formIsLoading}
                            >
                                {formIsLoading ? 'Salvando' : 'Salvar'}
                            </button>
                            </footer>
                            <Link href="/">
                                <a className="btnBack">VOLTAR</a>
                            </Link>
                        </form>
                    </main>
                </section>
        </>
    );
}

export default ComponentPage;

