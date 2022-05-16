import { NextPage } from "next";
import { Fragment } from "react";
import { Header } from "../Components/Header";

const ComponentPage: NextPage = () => {

    return (
        <Fragment>
            <div id="app">
                <section>
                    <Header />
                    
                </section>
            </div>
        </Fragment>
    );
}

export default ComponentPage;