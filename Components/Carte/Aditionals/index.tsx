import axios from "axios";
import { useEffect, useState } from "react";
import { useTrayItems } from "../../../Context/TrayItemsContext";
import { IngredientByType } from "../../../Types/BurgerType"
import { formatPrice } from "../../../utils/formatPrice";

type AditionalsPropsType = {
    id: number;
    keys?: number;
}


export const Aditionals = ({ id, keys }: AditionalsPropsType) => {

    const { aditionals, setAditionals, removeAditionals } = useTrayItems()

    const [ingredientByType, setIngredientByTypes] = useState<IngredientByType[]>([]);

    const getIngredientByTypes = async (id: number) => {
        const results = await axios.get(`ingredients/by-type/${id}`, {
            baseURL: process.env.API_URL
        })

        return results;
    }

    const saveAditionals = (e: any, { id, name, price }: { id: number; name: string; price: number; }) => {

        console.log(e.target.checked)

        if (e.target.checked) {
            const newAditionals = [{ id, name, price }, ...aditionals]

            setAditionals(newAditionals);
        } else {
            removeAditionals(id)
        }


    }

    useEffect(() => {

        getIngredientByTypes(id)
            .then(({ data }) => {

                setIngredientByTypes(data);

            })

    }, []);

    return (
        <>
            <ul className="aditionals">
                {ingredientByType && ingredientByType.map(({ id, name, description, price }, index) => (
                    <li key={index}>
                        <label data-id={id} data-name={name} data-price={price}>
                            <input type="checkbox" name="item" id={`aditional-${id}`} onChange={(e) => { saveAditionals(e, { id, name, price }) }} />
                            <span></span>
                            <h3>{name} <span>({description})</span></h3>
                            <div>{formatPrice(price)}</div>
                        </label>
                    </li>
                ))}
            </ul>
        </>
    )
}

