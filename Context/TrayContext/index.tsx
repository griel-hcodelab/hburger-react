import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TrayContextTypes } from "../../Types/Contexts/TrayContextTypes";

const TrayContext = createContext<TrayContextTypes>({
    open: false,
    setOpen: ()=>{}
});

export default function TrayProvider({children}:{ children: ReactNode}){

    const [open, setOpen] = useState(false);	

    useEffect(()=>{

        if (document && document.querySelector("aside#aside")) {
            if (open) {
                document.querySelector("aside#aside")?.classList.add('open');
            } else {
                document.querySelector("aside#aside")?.classList.remove('open');
            }
        }

    },[open]);

    return (
        <TrayContext.Provider value={{open, setOpen}}>
            {children}
        </TrayContext.Provider>
    );

}

export function useTray() {
    const context = useContext(TrayContext);

    if (!context) {
        throw new Error("Only use useTray's context within a TrayProvider, or you will broken the application");
    }

    return context;
}