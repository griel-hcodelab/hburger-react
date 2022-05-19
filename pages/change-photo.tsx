import { NextPage } from "next";
import { Header } from "../Components/Header";
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useAuth } from "../Context/AuthContext";
import { User } from "../Types/Auth/User";
import axios from "axios";
import { MetaTitle } from "../Components/Header/MetaTitle";
import { Toast } from "../Components/Toast";
import { MeResponse } from "../Types/Auth/MeResponse";
import { redirectToAuth } from "../utils/redirectToAuth";
import { withAuthentication } from "../utils/withAuthentication";

type ComponentPageProps = {
    token: string;
    user: User;
}

const ComponentPage: NextPage<ComponentPageProps> = ({ token, user }) => {
    console.log(token);

    const cropperRef = useRef<HTMLImageElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
    const [toastOpen, setToastOpen] = useState(false);
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');
    const { user: stateUser, setUser } = useAuth();
    const photoAtual = user.photo;

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const imgElement: any = cropperRef?.current;
        const cropper = imgElement?.cropper;

        if (!cropper) {
            setError('Selecione uma foto.');
            return false;
        }
        if (imageRef?.current) {
            imageRef.current.src = cropper.getCroppedCanvas().toDataURL();
        }

        cropper.getCroppedCanvas().toBlob((blob: Blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'photo.png');
            axios.put<User>(`/login/photo`, formData, {
                baseURL: process.env.API_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(({ data: { photo } }) => {
                user.photo = photo;
                setUser({
                    ...stateUser!,
                    photo,
                });
                setPhoto('');
                setToastType('success');
                setToastOpen(true);
                setTimeout(() => {
                    setToastOpen(false);
                }, 3000);
            }).catch((e) => {
                setToastType('danger');
                setError(e.messge);
                setToastOpen(true);
            });
        });
    }, [token, imageRef]);

    const onChangeFile = (event: any) => {
        const { files } = event.target as HTMLInputElement;
        if (files && files.length) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(String(reader.result));
            }
            reader.readAsDataURL(files[0]);
        }
    }

    const onSelectFile = () => {
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.addEventListener('change', onChangeFile);
        inputFile.click();
    }

    return (
        <>
            <MetaTitle title="Mude sua Foto :: HBurger" />
                <section>
                    <Header />
                    <main>
                        <form onSubmit={onSubmit} id="change-photo">
                            
                            {photo && <Cropper
                                src={photo}
                                style={{ height: 400, width: '100%' }}
                                aspectRatio={1}
                                guides={false}
                                ref={cropperRef}
                            />}

                            {!photo && <img
                                src={photoAtual}
                                alt="Foto Atual"
                                id="photo-preview"
                                onClick={onSelectFile}
                                ref={imageRef}
                            />}
                            
                            <button type="button" onClick={onSelectFile} className="choose-photo">
                                {!photo && 'Procurar Foto'}
                                {photo && 'Procurar outra Foto'}
                            </button>

                            <Toast
                                type={toastType}
                                open={toastOpen}
                            >
                                {error && toastType === 'danger' && <p>{error}</p>}
                                {!error && toastType === 'success' && <p>Foto atualziada com sucesso!</p>}
                            </Toast>

                            <div className="toast success">
                                <div id="alert"></div>
                            </div>
                                            
                            <footer className="fixed">
                                
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

export const getServerSideProps = withAuthentication(async (context) => {

    try {

        const { token } = context.req.session;

        const { data: user } = await axios.get<MeResponse>('/login/photo', {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return {
            props: { token, user }
        }

    } catch (e) {
        return redirectToAuth(context);
    }

});