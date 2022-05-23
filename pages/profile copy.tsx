import { NextPage } from "next";
import { Header } from "../Components/Header";
import React, { useCallback } from "react";
import "cropperjs/dist/cropper.css";
import { MetaTitle } from "../Components/Header/MetaTitle";
import axios from "axios";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { getOnlyNumbers } from "../utils/getOnlyNumbers";
import Link from "next/link";

type ZipCodeResponse = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
}

type FormData = {
    name: string;
    birth_at: string;
    address: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

const ComponentPage: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setError,
        watch,
        setValue,
    } = useForm<FormData>();

    const zipCode = watch("zipCode");
    const router = useRouter();
    const { token } = useAuth();

    const searchZipCode = useCallback((value: string) => {

        value = getOnlyNumbers(value);

        if (value.length >= 8 && value !== getOnlyNumbers(zipCode)) {

            axios.get<ZipCodeResponse>(`/addresses/cep/${value}`, {
                baseURL: process.env.API_URL,
            })
                .then(({ data }) => {
                    clearErrors();

                    setValue("address", data.logradouro);
                    setValue("district", data.bairro);
                    setValue("complement", data.complemento);
                    setValue("city", data.localidade);
                    setValue("state", data.uf);
                    setValue("country", "Brasil");

                    const numberField = document.querySelector<HTMLInputElement>("#number");

                    if (numberField) {
                        numberField.focus();
                    }
                })
                .catch(() => {
                    setError("zipCode", {
                        type: "required",
                        message: "O CEP não foi encontrado."
                    })
                });
        }

    }, [zipCode]);

    const onSubmit: SubmitHandler<FormData> = (data) => {

        data.zipCode = getOnlyNumbers(zipCode);

        axios.post("/addresses", data, {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(({ data: address }) => {
                router.push(`/profile?selected=${address.id}`);
            })
            .catch((e) => {
                if (e.response.data.error === "Unauthorized") {
                    router.push(`/auth?next=${router.pathname}`);
                } else {
                    setError("zipCode", {
                        type: "required",
                        message: e.message,
                    });
                }
            });

    }

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
                                    {...register("birth_at", {
                                        required: "O campo nome é obrigatório."
                                    })} 
                                />
                                <label htmlFor="birth_at">Data de Nascimento</label>
                            </div>

                            <div className="fields">

                                <div className="field">
                                    <input type="text" name="document" id="document" required/>
                                    <label htmlFor="document">CPF</label>
                                </div>

                                <div className="field">
                                    <input type="text" name="phone" id="phone" required/>
                                    <label htmlFor="phone">Telefone</label>
                                </div>

                            </div>

                            <div>
                                <h2>Informação Residencial</h2>
                            </div>
                            
                            <div className="field">
                                <input 
                                    type="text"
                                    id="zipcode"
                                    {...register("zipCode", {
                                        required: "O campo CEP é obrigatório.",
                                        onChange: (e) => { searchZipCode(e.target.value);}
                                    })} 
                                />
                                <label htmlFor="zipcode">CEP</label>
                                <img 
                                    src="/images/icons8-search-96.svg" className="btnSearch"
                                    onClick={() => searchZipCode(zipCode)}
                                />
                            </div>

                            <div className="field">
                                <input 
                                    type="text"
                                    id="address" 
                                    {...register("address", {
                                        required: "O campo Endereço é obrigatório."
                                    })} 
                                />
                                <label htmlFor="address">Endereço</label>
                            </div>

                            <div className="field">
                                <input 
                                    type="text"
                                    id="number" 
                                    {...register("number")} 
                                />
                                <label htmlFor="number">Número</label>
                            </div>

                            <div className="field">
                                <input 
                                    type="text"
                                    id="complement" 
                                    {...register("complement")} 
                                />
                                <label htmlFor="number">Complemento</label>
                            </div>

                            <div className="field">
                                <input 
                                    type="text"
                                    id="district" 
                                    {...register("district", {
                                        required: "O campo bairro é obrigatório."
                                    })} 
                                />
                                <label htmlFor="district">Bairro</label>
                            </div>

                            <div className="fields">

                                <div className="field">
                                    <input 
                                        type="text"
                                        id="city" 
                                        {...register("city", {
                                            required: "O campo estado é obrigatório."
                                        })} 
                                    />
                                    <label htmlFor="city">Cidade</label>
                                </div>

                                <div className="field">
                                    <input 
                                        type="text"
                                        id="state" 
                                        {...register("state", {
                                            required: "O campo estado é obrigatório."
                                        })} 
                                    />
                                    <label htmlFor="state">Estado</label>
                                </div>

                                <div className="field">
                                    <input 
                                        type="text"
                                        id="country" 
                                        {...register("country", {
                                            required: "O campo país é obrigatório."
                                        })} 
                                    />
                                    <label htmlFor="state">País</label>
                                </div>

                            </div>

                            <div id="alert"></div>

                            <footer>
                
                                <button>Salvar</button>
                
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