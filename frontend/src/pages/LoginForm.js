import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';

function LoginForm() {
	const navigate = useNavigate();
	const { username, setUsername } = useContext(AppContext);
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include', // that's what missed in code
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();

			if (data.logged) navigate('/user');
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex-container">
			<form className="login-box login-box-color" onSubmit={handleSubmit}>
				<input
					className="login-input"
					type="email"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
					autoComplete="current-username"
					required
				/>
				<input
					className="login-input"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					autoComplete="current-password"
					required
				/>
				{error && <p className="error">{error}</p>}
				<button
					type="submit"
					className="button-layout button-box"
					disabled={isLoading}
				>
					{isLoading ? 'Wait' : 'Login'}
				</button>
			</form>
		</div>
	);
}

export default LoginForm;
