import { NextPage } from "next";
import { Fragment } from "react";
import { Header } from "../Components/Header";
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ComponentPage: NextPage = () => {

    const cropperRef = useRef<HTMLImageElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        console.log(cropper.getCroppedCanvas().toDataURL());
    };

    const [photo, setPhoto] = useState('');

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const imgElement: any = cropperRef?.current;
        const cropper = imgElement?.cropper;

        if (!cropper) {
            console.log('Selecione uma foto.');
            return false;
        }

        if (imageRef?.current) {
            imageRef.current.src = cropper.getCroppedCanvas().toDataURL();
        }

        cropper.getCroppedCanvas().toBlob((blob: Blob) => {

            const formData = new FormData();

            formData.append('file', blob, 'photo.png');

        });


    }, [imageRef]);


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
        <Fragment>
            <div id="app">
                <section>
                    <Header />
                    <main>
                        <form onSubmit={onSubmit}>
                            <Cropper
                                src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
                                style={{ height: 400, width: "100%" }}
                                // Cropper.js options
                                initialAspectRatio={4 / 4}
                                guides={true}
                                crop={onCrop}
                                ref={cropperRef}
                                />
                            <img src="/images/default.png" alt="Foto Atual" id="photo-preview" />

                            <input type="file" name="photo" id="file" />

                            <input type="hidden" name="x" />
                            <input type="hidden" name="y" />
                            <input type="hidden" name="width" />
                            <input type="hidden" name="height" />

                            <button type="button" className="choose-photo">Escolher Foto</button>

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
            </div>
        </Fragment>
    );
}

export default ComponentPage;