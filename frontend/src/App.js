import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import LoginForm from './pages/LoginForm.js';
import User from './pages/User.js';
import { AuthProvider } from './components/AuthContext';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/LoginForm" element={<LoginForm />} />
					<Route path="/User" element={<User />} />
					<Route path="*" element={<Login />} />{' '}
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
