import styles from './carte.module.scss';

export const Carte = () => {
    return (
        <main className={styles.carte} id="carte">
            <header>
                <h1>Monte o seu <span>Hburger</span></h1>
            </header>
            <section>
                <div className={styles.category} id="burger">
                    <h2>Escolha seu H-Burger</h2>
                    <p>Primeiro, escolha seu lanche. Você pode adicionar mais ingredientes depois.</p>
                    <ul className={styles.burger} style={{ marginBottom: '50px' }}>
                        <li>
                            <label data-id="2" className={styles.inputRadio} data-burgername="H-Burger Pro" data-name="H-Burger Pro" data-price="25.5">
                                <input type="radio" name="burger" id="burger-2" />
                                <span className={styles.spanRadio}></span>
                                <h3>H-Burger Pro <span>(Pão, Hamburger, Ovo, Mussarela, Presunto, Alface, Milho, Batata Palha, Bacon e Catupiry)</span></h3>
                                <div>R$&nbsp;25,50</div>
                            </label>
                        </li>
                        <li>
                            <label data-id="3" data-burgername="H-Burger Pro" data-name="H-Burger Pro" data-price="25.5">
                                <input type="radio" name="burger" id="burger-3" />
                                <span className={styles.spanRadio}></span>
                                <h3>H-Burger Pro <span>(Pão, Hamburger, Ovo, Mussarela, Presunto, Alface, Milho, Batata Palha, Bacon e Catupiry)</span></h3>
                                <div>R$&nbsp;25,50</div>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="category hide" id="bread">
                    <h2>Quer um pão diferente? <small>(escolha apenas um)</small></h2>
                    <ul className="bread">

                    </ul>
                    <a href="#" className="btnBack" style={{ marginBottom: '50px' }}><span>Voltar pro lanche</span></a>
                </div>
                <div className="category hide" id="aditionals">
                    <h2>Quer turbinar seu lanche? <small>(Você pode escolher a vontade, ou simplesmente avançar)</small></h2>
                    <ul className="aditionals">

                    </ul>
                    <a href="#bread" className="btnBack" style={{ marginBottom: '50px' }}><span>Voltar pro pão</span></a>
                </div>
            </section>
        </main>
    )
}
