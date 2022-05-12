import axios from "axios";
import { useEffect, useState } from "react";
import { Burgers, IngredientByType, IngredientType, Selectedburger } from "../../Types/BurgerType";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../Button"
import { Loading } from "../Loading";
import { Title } from "../Title"


export const Carte = () => {

	const [burgers, setBurgers] = useState<Burgers[]>([]);
	const [ingredientType, setIngredientTypes] = useState<IngredientType[]>([]);
	const [ingredientByType, setIngredientByTypes] = useState<IngredientByType[]>([]);
	const [selectedBurger, setSelectedBurger] = useState<number>();

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

	const getIngredientByTypes = async (id: number) => {
		const results = await axios.get(`ingredients/by-type/${id}`, {
			baseURL: process.env.API_URL
		})

		return results;
	}

	const setBurger = (id: number) => {

		setSelectedBurger(id)

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

	useEffect(() => {

		const ingredients: any = [];

		ingredientType.forEach(async (item) => {



			const result = await getIngredientByTypes(item.id)
				.then(({ data }) => {
					// console.log(data)

					return data;

				})

			ingredients.push(result);

			setIngredientByTypes(ingredients);

		});



	}, [ingredientType]);



	return (
		<>

			<main>
				<Title text={<h1>Monte o seu <span>Hburger</span></h1>} />
				<section>
					<div className={selectedBurger ? 'category hide' : 'category'} id="burger">
						<h2>Escolha seu H-Burger</h2>
						<p>Primeiro, escolha seu lanche. Você pode adicionar mais ingredientes depois.</p>
						{burgers.length === 0 ? <Loading /> : ''}


						{burgers && burgers.map(({ id, name, price, description }) => (
							<ul className="burger" key={id}>
								<li>
									<label data-id="2" className='inputRadio' data-burgername={name} data-name={name} data-price={price}>
										<input type="radio" name="burger" id={`burger-${id}`} onChange={() => { setBurger(id) }} />
										<span className="spanRadio"></span>
										<h3>{name} <span>({description})</span></h3>
										<div>{formatPrice(price)}</div>
									</label>
								</li>
							</ul>
						))}


					</div>
					{selectedBurger && <div className="category" id="aditionals">
						<>
							<h2>Quer turbinar seu lanche? <small>(Você pode escolher a vontade, ou simplesmente avançar)</small></h2>

							{ingredientType &&
								ingredientType.map(({ id, name, description }) => (
									<h3>{name} <p>{description}</p></h3>


								))
							}

							<a href="#bread" className="btnBack" style={{ marginBottom: '50px' }}><span>Voltar para o lanche</span></a>
						</>
					</div>}


				</section>
			</main>
			<footer>
				<Button className="none" value="Escolha seu Lanche" disabled={true} tag={"button"} id="saveBurger" />
				<h2>R$0,00</h2>
			</footer>
		</>
	)
}
