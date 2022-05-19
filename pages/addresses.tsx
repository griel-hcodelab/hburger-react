import { NextPage } from "next";
import { Addresses } from "../Components/Addresses";
import { Header } from "../Components/Header";
import { MetaTitle } from "../Components/Header/MetaTitle";

import AuthContext from '../Context/AuthContext'


const ComponentPage: NextPage = () => {

    return (
        <>
        <AuthContext>
            <MetaTitle title="Seus Endereços :: HBurger" />
            <div id="app">

                <section>
                    <Header />
                    <main>
                        <Addresses />

                    </main>
                </section>

            </div>
            </AuthContext>
        </>
    )

}

export default ComponentPage;