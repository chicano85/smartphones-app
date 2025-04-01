import { render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';

// Mock del useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalItems: 20,
    itemsPerPage: 5,
    search: '',
  };

  it('renders nothing when only one page is needed', () => {
    const props = { ...defaultProps, totalItems: 5 };
    const { container } = render(<Pagination {...props} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination buttons correctly', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('< Prev')).toBeDisabled();
    expect(getByText('Next >')).toBeEnabled();
  });

  it('highlights current page', () => {
    const props = { ...defaultProps, currentPage: 2 };
    render(<Pagination {...props} />);
    
    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toHaveClass('active');
  });
}); 