import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TrayItemsTypes } from "../../Types/Contexts/TrayItemsTypes";

type TrayItems = {
    burger: any;
    aditional: TrayItemsTypes;
}

type TrayItemsTypesProps = {

    setBurger: (burger: TrayItemsTypes) => void,
    setAditional: (aditional: TrayItemsTypes[]) => void,
    sendBurgerToTray: () => void,
    removeBurger: (e:any) => void,

    aditional: TrayItemsTypes[],
    subTotal: number,
    total: number,
    trayItems: TrayItems[],

}

const TrayItemsContext = createContext<TrayItemsTypesProps>({

    setBurger: () => { },
    setAditional: () => { },
    sendBurgerToTray: () => { },
    removeBurger: () => { },

    aditional: [],
    subTotal: 0,
    total: 0,
    trayItems: [],
});

export default function TrayItemsProvider({ children }: { children: ReactNode }) {

    const [burger, setBurger] = useState<TrayItemsTypes | null>();
    const [aditional, setAditional] = useState<TrayItemsTypes[]>([]);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [trayItems, setTrayItems] = useState<any>([]);
    

    useEffect(()=>{

        const aditionalsPrice = aditional.reduce((total, item) => total + Number(item.price), 0);

        setSubTotal(aditionalsPrice + +burger?.price)

    },[burger, aditional])

    useEffect(()=>{

        const sum:number[] = []

        trayItems.forEach((item:any)=>{
            if (!isNaN(item.subTotal)) {
                sum.push(item.subTotal)
            }
        })

        const total = sum.reduce((total, item) => total + item, 0);

        setTotal(total);

    },[trayItems])

    const sendBurgerToTray = ()=>{

        const id = trayItems.length;

        setTrayItems([...trayItems, {burger, aditional, subTotal, id}])

        setBurger(null); setAditional([]);

    }

    const removeBurger = (e:any)=>{

        const burgerId:number = Number(e.target.closest('li').dataset.key);

        const aditional = trayItems.find((item:any)=> item.id === burgerId);

        if (aditional) {
            const filtered = trayItems.filter((item:any) => item.id !== burgerId);
            setTrayItems(filtered)
        }
    }

    return (
        <TrayItemsContext.Provider value={
            {
                setBurger,
                setAditional,
                sendBurgerToTray,
                removeBurger,
                aditional,
                subTotal,
                total,
                trayItems
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