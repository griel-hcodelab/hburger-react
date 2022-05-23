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