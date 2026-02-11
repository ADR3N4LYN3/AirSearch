import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GuestSection from '../GuestSection';

const defaultProps = {
  adults: 2,
  children: 0,
  infants: 0,
  onAdultsChange: vi.fn(),
  onChildrenChange: vi.fn(),
  onInfantsChange: vi.fn(),
};

function renderGuestSection(overrides = {}) {
  const props = { ...defaultProps, ...overrides };
  return render(<GuestSection {...props} />);
}

describe('GuestSection', () => {
  it('renders all three guest counters with labels', () => {
    renderGuestSection();
    expect(screen.getByText('Adultes')).toBeInTheDocument();
    expect(screen.getByText('13 ans et plus')).toBeInTheDocument();
    expect(screen.getByText('Enfants')).toBeInTheDocument();
    expect(screen.getByText('De 2 à 12 ans')).toBeInTheDocument();
    expect(screen.getByText('Bébés')).toBeInTheDocument();
    expect(screen.getByText('Moins de 2 ans')).toBeInTheDocument();
  });

  it('displays current values', () => {
    renderGuestSection({ adults: 3, children: 2, infants: 1 });
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onAdultsChange when incrementing adults', () => {
    const onAdultsChange = vi.fn();
    renderGuestSection({ adults: 2, onAdultsChange });
    const plusBtn = screen.getByLabelText('Plus de adultes');
    fireEvent.click(plusBtn);
    expect(onAdultsChange).toHaveBeenCalledWith(3);
  });

  it('calls onAdultsChange when decrementing adults', () => {
    const onAdultsChange = vi.fn();
    renderGuestSection({ adults: 3, onAdultsChange });
    const minusBtn = screen.getByLabelText('Moins de adultes');
    fireEvent.click(minusBtn);
    expect(onAdultsChange).toHaveBeenCalledWith(2);
  });

  it('enforces minimum 1 adult — decrement button disabled at 1', () => {
    const onAdultsChange = vi.fn();
    renderGuestSection({ adults: 1, onAdultsChange });
    const minusBtn = screen.getByLabelText('Moins de adultes');
    expect(minusBtn).toBeDisabled();
    fireEvent.click(minusBtn);
    expect(onAdultsChange).not.toHaveBeenCalled();
  });

  it('calls onChildrenChange when incrementing children', () => {
    const onChildrenChange = vi.fn();
    renderGuestSection({ children: 1, onChildrenChange });
    const plusBtn = screen.getByLabelText('Plus de enfants');
    fireEvent.click(plusBtn);
    expect(onChildrenChange).toHaveBeenCalledWith(2);
  });

  it('calls onChildrenChange when decrementing children', () => {
    const onChildrenChange = vi.fn();
    renderGuestSection({ children: 2, onChildrenChange });
    const minusBtn = screen.getByLabelText('Moins de enfants');
    fireEvent.click(minusBtn);
    expect(onChildrenChange).toHaveBeenCalledWith(1);
  });

  it('disables children decrement at 0', () => {
    renderGuestSection({ children: 0 });
    const minusBtn = screen.getByLabelText('Moins de enfants');
    expect(minusBtn).toBeDisabled();
  });

  it('calls onInfantsChange when incrementing infants', () => {
    const onInfantsChange = vi.fn();
    renderGuestSection({ infants: 0, onInfantsChange });
    const plusBtn = screen.getByLabelText('Plus de bébés');
    fireEvent.click(plusBtn);
    expect(onInfantsChange).toHaveBeenCalledWith(1);
  });

  it('disables adults increment at max (16)', () => {
    renderGuestSection({ adults: 16 });
    const plusBtn = screen.getByLabelText('Plus de adultes');
    expect(plusBtn).toBeDisabled();
  });
});
