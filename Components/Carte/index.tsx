import axios from "axios";
import { useEffect, useState } from "react";
import { Burgers, IngredientByType, IngredientType, Selectedburger } from "../../Types/BurgerType";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../Button"
import { Loading } from "../Loading";
import { Title } from "../Title"
import { Aditionals } from "./Aditionals";
import styled from 'styled-components';
import { useTrayItems } from "../../Context/TrayItemsContext";


const H3 = styled.h3`
	margin: 0;
    margin-top: 40px;
`;

type selectedBurger = {
	id: number;
	name: string;
	price: number;
}

/**
 * @todo: salvar lanche, voltar pra fazer outro
 * @todo: adicionar ingredientes na bandeja somente após salvar o lanche
 * 
 */

const CarteComponent = () => {

	const [burgers, setBurgers] = useState<Burgers[]>([]);
	const [ingredientType, setIngredientTypes] = useState<IngredientType[]>([]);
	const [hasSelectedBurger, setHaveSelectedBurger] = useState<number | null>(null);
	const [selectedBurger, setSelectedBurger] = useState<selectedBurger>();


	const getBurgers = async () => {
		const results = await axios.get('/products', {
			baseURL: process.env.API_URL
		})

		return results;
	}

	const getIngredientTypes = async () => {
		const results = await axios.get('/ingredients/types', {
			baseURL: process.env.API_URL
		})

		return results;
	}

	const { setBurger, setAditionals } = useTrayItems();

	const sendBurgerToTray = ()=>{

		setBurger(selectedBurger)

		setHaveSelectedBurger(null)
		setAditionals([])
		
	}

	const saveBurger = ({ id, name, price }: { id: number; name: string; price: number; }) => {

		setHaveSelectedBurger(id)

		setSelectedBurger({ id, name, price });


	}

	const clearBurger = () => {
		setHaveSelectedBurger(null)
		setAditionals([])
		setBurger([])

		document.querySelectorAll("input[type='radio']").forEach((item: any) => {

			item.checked = false;

		})

		document.querySelectorAll("input[type='checkbox']").forEach((item: any) => {

			item.checked = false;

		})

	}

	useEffect(() => {

		getBurgers()
			.then(({ data }) => {
				setBurgers(data);
			})

		getIngredientTypes()
			.then(({ data }) => {
				setIngredientTypes(data);
			})

	}, []);



	return (
		<>

			<main>
				<Title text={<h1>Monte o seu <span>Hburger</span></h1>} />
				<section>
					<div className={hasSelectedBurger ? 'category hide' : 'category'} id="burger">
						<h2>Escolha seu H-Burger</h2>
						<p>Primeiro, escolha seu lanche. Você pode adicionar mais ingredientes depois.</p>
						{burgers.length === 0 ? <Loading /> : ''}


						<ul className="burger">
							{burgers && burgers.map(({ id, name, price, description }) => (
								<li key={id}>
									<label data-id="2" className='inputRadio' data-burgername={name} data-name={name} data-price={price}>
										<input type="radio" name="burger" id={`burger-${id}`} onChange={(e) => { saveBurger({ id, name, price }) }} />
										<span className="spanRadio"></span>
										<h3>{name} <span>({description})</span></h3>
										<div>{formatPrice(price)}</div>
									</label>
								</li>
							))}
						</ul>


					</div>
					{hasSelectedBurger && <div className="category" id="aditionals">
						<>
							<h2>Quer turbinar seu lanche? <small>(Você pode escolher a vontade, ou simplesmente avançar)</small></h2>

							{ingredientType &&
								ingredientType.map(({ id, name, description }, index) => (
									<>
										<H3 key={index}>{name} <p>{description}</p></H3>

										<Aditionals key={`aditional-${name}-${index}`} id={id} />

									</>


								))
							}

							<a href="#bread" className="btnBack" style={{ marginBottom: '50px' }} onClick={clearBurger}><span>Voltar para o lanche</span></a>
						</>
					</div>}


				</section>
			</main>
			<footer>
				<Button className="none" value="Colocar na bandeja" onClick={sendBurgerToTray} disabled={hasSelectedBurger ? false : true} tag={"button"} id="saveBurger" />
				<h2>R$0,00</h2>
			</footer>
		</>
	)
}


export default function Carte() {
	return (

		<CarteComponent />

	)
}