import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChipSelect from '@/components/ChipSelect';

const MOCK_ITEMS = [
  { id: 'wifi', label: 'WiFi', icon: <span>W</span> },
  { id: 'pool', label: 'Piscine', icon: <span>P</span> },
  { id: 'parking', label: 'Parking', icon: <span>K</span> },
];

describe('ChipSelect', () => {
  it('renders with items', () => {
    render(<ChipSelect items={MOCK_ITEMS} selected="" onToggle={() => {}} />);
    expect(screen.getByText('WiFi')).toBeInTheDocument();
    expect(screen.getByText('Piscine')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
  });

  it('calls onToggle with the correct id on click', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<ChipSelect items={MOCK_ITEMS} selected="" onToggle={onToggle} />);

    await user.click(screen.getByText('Piscine'));
    expect(onToggle).toHaveBeenCalledWith('pool');
  });

  it('active chip has aria-pressed=true', () => {
    render(<ChipSelect items={MOCK_ITEMS} selected="wifi" onToggle={() => {}} />);
    const wifiButton = screen.getByText('WiFi').closest('button')!;
    expect(wifiButton).toHaveAttribute('aria-pressed', 'true');

    const poolButton = screen.getByText('Piscine').closest('button')!;
    expect(poolButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('multi-select works', () => {
    render(
      <ChipSelect items={MOCK_ITEMS} selected={['wifi', 'parking']} onToggle={() => {}} multi />,
    );
    const wifiButton = screen.getByText('WiFi').closest('button')!;
    expect(wifiButton).toHaveAttribute('aria-pressed', 'true');

    const parkingButton = screen.getByText('Parking').closest('button')!;
    expect(parkingButton).toHaveAttribute('aria-pressed', 'true');

    const poolButton = screen.getByText('Piscine').closest('button')!;
    expect(poolButton).toHaveAttribute('aria-pressed', 'false');
  });
});
