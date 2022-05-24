import axios from "axios";
import { useEffect, useState } from "react";
import { useTrayItems } from "../../Context/TrayItemsContext";
import { TypeAddresses } from "../../Types/Addresses";
import styles from './addresses.module.scss'


export const AddressWidgetComponent = () => {

    const [addressList, setAddressList] = useState<TypeAddresses[]>([]);
    const { setAddress } = useTrayItems()

    useEffect(() => {
        axios.get("/api/addresses")
            .then(({ data }) => {
                setAddressList(data)
            })
    }, [])

    const handleAddress = (e:any)=>{

        const selected = Number(e.target.selectedOptions[0].value);

        setAddress(selected)
    }

    return (
        <>
        <p className={styles.select_address_p}>Escolha seu endereço de entrega</p>
        <select data-testid="option" name="addresses" id="addresses" className={styles.select_address} onChange={handleAddress}>
        <option value="0">Escolha seu endereço de entrega</option>
            {
            addressList.map(({ id, street }) => (
                <option  key={id} value={id}>{street}</option>
            ))
        }</select>
        </>
    )
}
