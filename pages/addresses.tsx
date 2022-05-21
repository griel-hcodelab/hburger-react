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

                <section>
                    <Header />
                    <main>
                        <Addresses />
                    </main>
                </section>

            </AuthContext>
        </>
    )

}

export default ComponentPage;