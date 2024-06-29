import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice'; // adjust import based on your project structure
import Form from '../Form';

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithProviders = (ui, { reduxState } = {}) => {
  const history = createMemoryHistory();
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: reduxState,
  });
  return render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        {ui}
      </Router>
    </Provider>
  );
};

describe('Form Component', () => {
  test('renders registration form', () => {
    renderWithProviders(<Form />, { reduxState: { user: { deviceID: '12345' } } });

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/age/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter a valid mobile number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/address/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test('handles form input correctly', () => {
    renderWithProviders(<Form />, { reduxState: { user: { deviceID: '12345' } } });

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '25' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/enter a valid mobile number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/address/i), { target: { value: '123 Main St' } });

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue('testuser');
    expect(screen.getByPlaceholderText(/age/i)).toHaveValue('25');
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('testuser@example.com');
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('password123');
    expect(screen.getByPlaceholderText(/enter a valid mobile number/i)).toHaveValue('1234567890');
    expect(screen.getByPlaceholderText(/address/i)).toHaveValue('123 Main St');
  });
});
