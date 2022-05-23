import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import NewAddressPage from '../pages/new-address';



it('Should be rendered the new address page', () => {
  render(<NewAddressPage />);
})

it('Should be editable form', ()=>{
  render (<NewAddressPage />)

  userEvent.type(screen.getByPlaceholderText('Digite aqui seu CEP'),'00000000');
  userEvent.type(screen.getByPlaceholderText('Digite aqui seu endereço'),'Rua de Testes');
  userEvent.type(screen.getByPlaceholderText('Digite aqui o número, se houver'),'0');
  userEvent.type(screen.getByPlaceholderText('Digite aqui seu bairro'),'Centro');
  userEvent.type(screen.getByPlaceholderText('Digite aqui sua cidade'),'São Paulo');
  userEvent.type(screen.getByPlaceholderText('Digite aqui seu estado'),'SP');
  userEvent.type(screen.getByPlaceholderText('Digite aqui seu país'),'Brasil');

})