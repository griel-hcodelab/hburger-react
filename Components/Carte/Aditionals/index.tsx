import axios from "axios";
import { useEffect, useState } from "react";
import { useTrayItems } from "../../../Context/TrayItemsContext";
import { IngredientByType } from "../../../Types/BurgerType"
import { formatPrice } from "../../../utils/formatPrice";


export const Aditionals = ({ id }: { id: number }) => {

    const { aditionals, setAditionals, removeAditionals } = useTrayItems()

    const [ingredientByType, setIngredientByTypes] = useState<IngredientByType[]>([]);

    const getIngredientByTypes = async (id: number) => {
        const results = await axios.get(`ingredients/by-type/${id}`, {
            baseURL: process.env.API_URL
        })

        return results;
    }

    const setAditionalsToTray = (e:any, {id, name, price}:{id: number; name: string; price: number;}) => {


        if(e.target.checked){
            const newAditionals = [{id, name, price}, ...aditionals]
    
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
            {ingredientByType && ingredientByType.map(({id, name, description, price}, index)=> (
            <li key={`${id}-${name}`}>
                <label data-id={id} data-name={name} data-price={price}>
                    <input type="checkbox" name="item" id={`aditional-${id}`} onChange={(e)=>{setAditionalsToTray(e, {id, name, price})}} />
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

