import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import { UserContext } from './contexts/UserContext';
import { fallbackInfo } from './data/fallback';
import { onSnapshot } from 'firebase/firestore';

jest.mock('./firebase/firebaseConfig', () => ({ db: {} }));
jest.mock('firebase/firestore', () => ({ collection: jest.fn(), onSnapshot: jest.fn(() => jest.fn()) }));
jest.mock('./components/Studio/useStudioMotion', () => ({ useReducedMotion: () => true, useScrollReveal: () => {} }));
jest.mock('./components/Studio/TerminalShowcase', () => () => <div />);

beforeEach(() => onSnapshot.mockReturnValue(() => {}));

test('the profile presents AI work, ownership, current branding, and the updated CV', () => {
  render(<MemoryRouter><UserContext.Provider value={{ myData: fallbackInfo }}><LandingPage /></UserContext.Provider></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Engineering AI.Building trust.');
  expect(screen.getByText('2Million+')).toBeInTheDocument();
  expect(screen.getByText(/I own and co-founded Afroawi Technologies, where/)).toBeInTheDocument();
  expect(screen.getByText(/custom n8n nodes, community packages, and SDKs/)).toBeInTheDocument();
  expect(screen.getAllByRole('img', { name: 'TestSavant.AI' })).toHaveLength(2);
  expect(screen.getAllByRole('img', { name: 'Afroawi Technologies' })).toHaveLength(2);
  expect(screen.getByRole('link', { name: 'The résumé' })).toHaveAttribute('href', '/assets/resume/myresume.pdf');
  expect(screen.getByRole('link', { name: 'View my updated résumé' })).toHaveAttribute('href', '/assets/resume/myresume.pdf');
  expect(document.getElementById('blog')).not.toBeInTheDocument();
  expect(within(screen.getByRole('navigation')).queryByRole('button', { name: 'Journal' })).not.toBeInTheDocument();
  expect(document.body).not.toHaveTextContent('✳');
  const stack = screen.getByRole('region', { name: 'From models to interfaces.' });
  expect(stack.querySelectorAll('li')).toHaveLength(12);
  stack.querySelectorAll('li').forEach(item => expect(item.querySelector('svg, img')).not.toBeNull());
});
