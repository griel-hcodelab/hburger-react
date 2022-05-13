import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TrayItemsContextType, TrayItemsTypes } from "../../Types/Contexts/TrayItemsTypes";

type data = {
    data: TrayItemsTypes
}

const TrayItemsContext = createContext<TrayItemsTypes>({

    id: null,
    name: null,
    price: null,
    setId: () => {},
    setName: () => {},
    setPrice: () => {},
});


export default function TrayItemsProvider({children}:{ children: ReactNode}){

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();


    return (
        <TrayItemsContext.Provider value={{id, name, price, setId, setName, setPrice}}>
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