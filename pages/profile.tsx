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

type FormData = {
    name: string;
    email: string;
    birth_at?: string;
    document?: number;
    phone?: number;
    server?: string;
}

type ComponentPageProps = {
    token: string;
    user: User;
}

const ComponentPage: NextPage<ComponentPageProps> = ({ token, user }) => {

    const [formIsLoading, setFormIsLoading] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
    const [toastIsOpen, setToastOpen] = useState(false);
    const [error, setError] = useState('');

    const { user: contextUser, setUser } = useAuth();

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<FormData>({
        defaultValues: {
            name: user.name,
            email: user.email,
            birth_at: user.birthAt ? user.birthAt.substring(0, 10) : '',
        }
    });

    const showErrorToast = (message: string) => {
        setError(message);
        setToastType('danger');
        setToastOpen(true);
    
        setTimeout(() => {
          setToastOpen(false);
        }, 5000);
      };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        axios.patch<User>(`/login`, data, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(({ data }) => {
            setUser(data);
            setToastType('success');
            setToastOpen(true);
            setTimeout(() => {
                setToastOpen(false);
            }, 3000);
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
                                <input 
                                    type="text"
                                    id="birth_at" 
                                    {...register("birth_at")} 
                                />
                                <label htmlFor="birth_at">Data de Nascimento</label>
                            </div>
                            <div className="fields">
                                <div className="field">
                                    <input 
                                        type="text"
                                        id="document" 
                                        {...register("document")}
                                    />
                                    <label htmlFor="document">CPF</label>
                                </div>
                                <div className="field">
                                    <input 
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

export const getServerSideProps = withAuthentication(async (context) => {

    try {

        const { token } = context.req.session;

        const { data: user } = await axios.get<MeResponse>('/auth/me', {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return {
            props: { token, user }
        }

    } catch (e) {
        return redirectToAuth(context);
    }

});