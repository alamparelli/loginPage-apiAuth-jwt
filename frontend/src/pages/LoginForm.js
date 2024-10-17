import React, { useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

function LoginForm() {
	const { setAccessToken } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const validateToken = async (accessToken) => {
		const decodedToken = jwtDecode(accessToken);
		return decodedToken.password === password;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			setAccessToken(data.token);

			const tokenIsValid = await validateToken(data.token);

			if (tokenIsValid) navigate('/user');
		} catch (err) {
			setError(err.message); // Set error message for UI feedback
		} finally {
			setIsLoading(false); // End the loading spinner
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
					required
				/>
				<input
					className="login-input"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				{error && <p style={{ color: 'red' }}>{error}</p>}
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
