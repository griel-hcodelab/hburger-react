import { createContext, ReactNode, useContext, useState } from "react";
import { TypeAddresses } from "../../Types/Addresses";

type AddressContextType = {
    id: number;
}

const AddressContext = createContext<AddressContextType>({
    id: 0
});

export default function AddressProvider({children}:{children: ReactNode}) {

    const [id, setId] = useState(0);

    return (
        <AddressContext.Provider value={{id}}>
            {children}
        </AddressContext.Provider>
        )

}

export function useAddress() {
    const context = useContext(AddressContext);

    if (!context) {
        throw new Error("Only use useAddress's context within a AddressProvider, or you will broken the application");
    }

    return context;
}