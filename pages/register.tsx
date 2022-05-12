import axios from 'axios';
import { NextPage } from 'next';
import React, { useState } from 'react';
import AuthLayout from '../Components/Auth/Layout';

const PageComponent: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('/api/register', {
        name,
        email,
        phone,
        password,
      });

      console.log(data.token);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <AuthLayout>
      <form id="form-register" onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefone"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <footer>
          <button type="submit">Enviar</button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
