import { fireEvent, render, screen } from '@testing-library/react';
import { PhoneDetail } from '../PhoneDetail';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock del CartContext
jest.mock('@/context/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
  }),
}));

describe('PhoneDetail', () => {
  const mockPhone = {
    id: '1',
    brand: 'Apple',
    name: 'iPhone Test',
    description: 'Test description',
    basePrice: 999,
    rating: 4.5,
    specs: {
      screen: '6.1"',
      resolution: '2532 x 1170',
      processor: 'A15',
      mainCamera: '12MP',
      selfieCamera: '12MP',
      battery: '3240mAh',
      os: 'iOS 15',
      screenRefreshRate: '60Hz'
    },
    colorOptions: [
      { name: 'black', hexCode: '#000000', imageUrl: 'test-black.jpg' },
      { name: 'white', hexCode: '#FFFFFF', imageUrl: 'test-white.jpg' }
    ],
    storageOptions: [
      { capacity: '128GB', price: 999 },
      { capacity: '256GB', price: 1099 }
    ],
    similarProducts: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders phone details correctly', () => {
    render(<PhoneDetail phone={mockPhone} />);
    expect(screen.getByText('IPHONE TEST')).toBeInTheDocument();
    expect(screen.getByText(/From 999 EUR/)).toBeInTheDocument();
  });

  it('allows color selection', () => {
    render(<PhoneDetail phone={mockPhone} />);
    const colorOption = screen.getByTestId('color-option-black');
    fireEvent.click(colorOption);
    expect(screen.getByText('black')).toBeInTheDocument();
  });

  it('allows storage selection', () => {
    render(<PhoneDetail phone={mockPhone} />);
    const storageOption = screen.getByText('128GB');
    fireEvent.click(storageOption);
    expect(storageOption).toHaveClass('selected');
  });
}); 