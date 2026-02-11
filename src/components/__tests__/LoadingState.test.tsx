import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingState from '@/components/LoadingState';

vi.mock('@/components/LottieAnimation', () => ({
  default: () => <div data-testid="lottie-animation" />,
}));

describe('LoadingState', () => {
  it('renders without crashing', () => {
    render(<LoadingState />);
  });

  it('displays loading text', () => {
    render(<LoadingState />);
    expect(screen.getByText('Recherche en cours...')).toBeInTheDocument();
  });
});
