import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../Context/AuthContext';
import { TypeAddresses } from '../../Types/Addresses';
import Button from '../Button';
import { Title } from '../Title'
import styles from './addresses.module.scss';

const NewButtonDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
    }
`

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
            .then(({ data }) => {
                getAddresses()
            })

    }

    useEffect(() => {
        getAddresses()
    }, [])



    return (
        <>
            <Title text="Seus Endereços" />

            <NewButtonDiv>
                <Button tag="a" href="/new-address" value="NOVO ENDEREÇO" />
                <Button tag="a" href="/" value="PÁGINA INICIAL" />
            </NewButtonDiv>

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
                                <a className="btnBack" style={{ background: 'green' }}>Editar</a>
                            </Link>
                            <button className="btnBack" onClick={(e) => {
                                confirm("Você deseja apagar este endereço? Este processo é irreversível.") ? removeAddress(e) : null
                            }} data-id={id}>Apagar</button>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}
