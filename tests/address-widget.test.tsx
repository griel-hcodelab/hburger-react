import { render, screen } from '@testing-library/react';

import { AddressWidgetComponent } from '../Components/Addresses/AddressWidgetComponent';

it('Will render the addresses widget', () => {
  render(<AddressWidgetComponent />);

  expect(screen.getByTestId('option'));
})