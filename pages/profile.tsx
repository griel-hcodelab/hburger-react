import { NextPage } from "next";
import { Fragment } from "react";
import { Header } from "../Components/Header";
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { MetaTitle } from "../Components/Header/MetaTitle";

const ComponentPage: NextPage = () => {
    return (
        <>
            <MetaTitle title="Meus Dados :: HBurger" />
                <section>
                    <Header />
                    <main>
                        <header className="page-title">
                            <h1>Dados <span>Pessoais</span></h1>
                        </header>
                        <form id="address-profile">
                            <div className="field">
                                <input type="text" name="name" id="name" required/>
                                <label htmlFor="name">Nome Completo</label>
                            </div>

                            <div className="field">
                                <input type="text" name="birth_at" id="birth_at" required/>
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
                                <input type="text" name="zipcode" id="zipcode" required/>
                                <label htmlFor="zipcode">CEP</label>
                            </div>

                            <div className="field">
                                <input type="text" name="address" id="address" required/>
                                <label htmlFor="address">Endereço</label>
                            </div>

                            <div className="field">
                                <input type="text" name="number" id="number" required/>
                                <label htmlFor="number">Número</label>
                            </div>

                            <div className="field">
                                <input type="text" name="district" id="district" required/>
                                <label htmlFor="district">Bairro</label>
                            </div>

                            <div className="fields">

                                <div className="field">
                                    <input type="text" name="city" id="city" required/>
                                    <label htmlFor="city">Cidade</label>
                                </div>

                                <div className="field">
                                    <input type="text" name="state" id="state" required/>
                                    <label htmlFor="state">Estado</label>
                                </div>

                            </div>

                            <div id="alert"></div>

                            <footer>
                
                                <button type="submit">Salvar</button>
                
                            </footer>
                            <a href="/" className="btnBack">VOLTAR</a>
                        </form>

                    </main>
                </section>
        </>
    );
}

export default ComponentPage;