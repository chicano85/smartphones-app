import { fireEvent, render, screen } from '@testing-library/react';
import { CartContainer } from '../CartContainer';

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();
const mockClearCart = jest.fn();

jest.mock('@/context/CartContext', () => ({
  useCart: () => ({
    cart: [
      {
        phoneId: '1',
        name: 'iPhone Test',
        brand: 'Apple',
        color: 'black',
        storage: '128GB',
        price: 999,
        image: 'test.jpg',
        quantity: 1,
      },
      {
        phoneId: '2',
        name: 'Galaxy Test',
        brand: 'Samsung',
        color: 'white',
        storage: '256GB',
        price: 899,
        image: 'test2.jpg',
        quantity: 2,
      },
    ],
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
    clearCart: mockClearCart,
  }),
}));

// Mock de next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} onClick={(e) => {
      e.preventDefault();
      mockRouter.push(href);
    }}>
      {children}
    </a>
  );
});

describe('CartContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart items correctly', () => {
    render(<CartContainer />);
    expect(screen.getByText('iPhone Test')).toBeInTheDocument();
    expect(screen.getByText('Galaxy Test')).toBeInTheDocument();
  });

  it('removes item from cart', () => {
    render(<CartContainer />);
    const removeButtons = screen.getAllByText(/eliminar/i);
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(0);
  });

  it('navigates to home when clicking continue shopping', () => {
    render(<CartContainer />);
    const continueButton = screen.getByText(/continue shopping/i);
    fireEvent.click(continueButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
}); 