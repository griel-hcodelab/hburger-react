import axios from "axios";

export async function getZipcode(zipcode: string) {

    const zipCodeFixed = zipcode.replace(/\D/g,'');

    const data = await axios.get(`https://viacep.com.br/ws/${zipCodeFixed}/json/`)
    .then(({data})=>{
        
        return data;
    })
    .catch((e:any)=>{
        console.log(e.message)
    })

    return {
        street: data.logradouro,
        complement: data.complemento,
        city: data.localidade,
        district: data.bairro,
        state: data.uf,
        zipcode: data.cep
    }

}