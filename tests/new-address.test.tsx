import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import NewAddressPage from '../pages/new-address';



it('Should be rendered the new address page', () => {
  render(<NewAddressPage />);
})

it('Should be editable form', ()=>{
  render (<NewAddressPage />)


  userEvent.type(screen.getByPlaceholderText('Digite aqui seu endereço'),'Rua de Testes')
})