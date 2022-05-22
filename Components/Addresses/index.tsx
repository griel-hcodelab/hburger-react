import axios from 'axios';
import Link from 'next/link';
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

        const id = e.target.dataset.id;

        await axios.post(`/api/delete-address`, {
            body: {
                id
            }
        })
        .then(({data})=>{
            getAddresses()
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
                            <Link href={`addresses/${id}`}>
                                <a className="btnBack" style={{background: 'green'}} href="#">Editar</a>
                            </Link>
                            <button  className="btnBack" onClick={(e)=>{
                                confirm("Você deseja apagar este endereço? Este processo é irreversível.") ? removeAddress(e) : null
                                }} data-id={id}>Apagar</button>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}
