import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Workbench from './Workbench';

test('each isometric block reveals the corresponding work on hover', () => {
  render(<Workbench motionPaused={false} onToggleMotion={() => {}} />);
  const details = document.getElementById('bench-detail');
  [
    ['Design', 'Interfaces for real people.'],
    ['AI testing', 'Test models. Challenge agents.'],
    ['Automate', 'Connect the agentic stack.'],
    ['Afroawi', 'My company. Ideas made real.']
  ].forEach(([name, title]) => {
    const block = screen.getByRole('button', { name: `Explore ${name}` });
    fireEvent.mouseEnter(block);
    expect(details).toHaveTextContent(title);
    expect(block).toHaveAttribute('aria-pressed', 'true');
  });
  expect(details).toHaveTextContent('I own Afroawi Technologies');
});

test('the blocks also work with focus, keyboard activation, and taps', () => {
  render(<Workbench motionPaused={false} onToggleMotion={() => {}} />);
  const details = document.getElementById('bench-detail');
  const automate = screen.getByRole('button', { name: 'Explore Automate' });
  expect(automate).toHaveAttribute('tabindex', '0');
  fireEvent.focus(automate);
  expect(details).toHaveTextContent('custom n8n nodes');
  fireEvent.keyDown(screen.getByRole('button', { name: 'Explore Design' }), { key: 'Enter' });
  expect(details).toHaveTextContent('Interfaces for real people.');
  fireEvent.keyDown(screen.getByRole('button', { name: 'Explore Afroawi' }), { key: ' ' });
  expect(details).toHaveTextContent('I own Afroawi Technologies');
  fireEvent.click(screen.getByRole('button', { name: 'Explore AI testing' }));
  expect(details).toHaveTextContent('prompt-injection defenses');
});

test('page animation controls still call the supplied toggle', () => {
  const toggle = jest.fn();
  const { rerender } = render(<Workbench motionPaused={false} onToggleMotion={toggle} />);
  fireEvent.click(screen.getByRole('button', { name: 'Pause page animations' }));
  expect(toggle).toHaveBeenCalledTimes(1);
  rerender(<Workbench motionPaused onToggleMotion={toggle} />);
  expect(screen.getByRole('button', { name: 'Resume page animations' })).toHaveAttribute('aria-pressed', 'true');
});
