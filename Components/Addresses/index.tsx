import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { TypeAddresses } from '../../Types/Addresses';
import { Title } from '../Title'
import styles from './addresses.module.scss';


export const Addresses = () => {

    const [addresses, setAddresses] = useState<TypeAddresses[]>([]);

    const { token } = useAuth();

    const getAddresses = async () => {
        await axios.get(`api/addresses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(({ data }) => {
                setAddresses(data);
            })
    }

    const removeAddress = async (e: any) => {
        console.log(e.target.dataset.id);
        await axios.delete(`api/addresses/${e.target.dataset.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(({ data }) => {
                setAddresses(data);
            })
    }

    useEffect(() => {
        getAddresses()
    }, [])



    return (
        <>
            <Title text="Seus Endereços" />

            <div id="addresses" className={styles.addresses}>
                {addresses && addresses.map(({ id, street, number, complement, city, district, state, zipcode }: TypeAddresses, index) => (
                    <div key={index} className={styles.address}>
                        <div className={styles.wrap}>
                            <p>{street}, {number}</p>
                            <p>{complement}</p>
                            <p>{district}</p>
                            <p>{city} - {state}</p>
                            <p>{zipcode}</p>
                        </div>
                        <div className={styles.wrap}>
                            <button data-id={id}>Editar</button>
                            <button onClick={removeAddress} data-id={id}>Apagar</button>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}
