import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TrayItemsTypes } from "../../Types/Contexts/TrayItemsTypes";

type TrayItemsTypesProps = {
    // aditionals: TrayItemsTypes[],
    // addItems: ()=>void;
    // removeItems: ()=>void;
    // addAditionals: ()=>void;
    // removeAditionals: ()=>void;
    // burger: TrayItemsTypes[];
    // setBurger: (burger:TrayItemsTypes)=>void;
    // setAditionals: (aditionals:TrayItemsTypes[])=>void;

    burger: TrayItemsTypes[],
    aditionals: TrayItemsTypes[],
    removeAditionals: (aditionals: any) => void;
    removeBurger: (burger: any) => void;
    setBurger: (burger: any) => void;
    setAditionals: (aditionals: any) => void;
}

const TrayItemsContext = createContext<TrayItemsTypesProps>({
    aditionals: [],
    burger: [],
    removeAditionals: () => { },
    removeBurger: () => { },
    setBurger: () => { },
    setAditionals: () => { }

});


export default function TrayItemsProvider({ children }: { children: ReactNode }) {

    const [burger, setBurger] = useState<TrayItemsTypes[]>([]);
    const [aditionals, setAditionals] = useState<TrayItemsTypes[]>([]);

    const addBurger = ({ id, name, price }: { id: number; name: string; price: number; }) => {

        const newBurger = [...burger, { id, name, price }];

        setBurger(newBurger);

    }

    const removeBurger = (id: number) => {
        burger.filter(({ id }) => id !== id);

    }

    const addAditionals = ({ id, name, price }: { id: number; name: string; price: number; }) => {

        const newAditionals = [...aditionals, { id, name, price }];

        setAditionals(newAditionals);

    }

    const removeAditionals = (id: number) => {
        aditionals.filter(({ id }) => id !== id);
    }

    const organizeTray = () => {
        const newTray = [...burger, ...aditionals];
        return newTray;
    }


    return (
        <TrayItemsContext.Provider value={
            {
                aditionals,
                burger,
                removeAditionals,
                setBurger,
                removeBurger,
                setAditionals
            }
        }>
            {children}
        </TrayItemsContext.Provider>
    );

}

export function useTrayItems() {
    const context = useContext(TrayItemsContext);

    if (!context) {
        throw new Error("Only use useTray's context within a TrayProvider, or you will broken the application");
    }

    return context;
}