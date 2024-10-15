import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import LoginForm from './pages/LoginForm.js';
import User from './pages/User.js';
import Admin from './pages/Admin.js';

function App() {
	return (
		<body className="bg-green-200 min-h-screen">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/LoginForm" element={<LoginForm />} />
					<Route path="/User" element={<User />} />
					<Route path="/Admin" element={<Admin />} />
					<Route path="*" element={<Login />} />{' '}
				</Routes>
			</Router>
		</body>
	);
}

export default App;
