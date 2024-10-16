import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import LoginForm from './pages/LoginForm.js';
import User from './pages/User.js';

function App() {
	return (
		<body>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/LoginForm" element={<LoginForm />} />
					<Route path="/User" element={<User />} />
					<Route path="*" element={<Login />} />{' '}
				</Routes>
			</Router>
		</body>
	);
}

export default App;
