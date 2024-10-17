import React, { useState } from 'react';

function LoginForm() {
	const [token, setToken] = useState(null);
	const [username, setUsername] = useState('');
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
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			setToken(data.token);
		} catch (err) {
			setError(err.message); // Set error message for UI feedback
		} finally {
			setIsLoading(false); // End the loading spinner
		}
	};

	return (
		<div class="flex-container">
			<form class="login-box login-box-color" onSubmit={handleSubmit}>
				<input
					class="login-input"
					type="email"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
					required
				/>
				<input
					class="login-input"
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
					class="button-layout button-box"
					disabled={isLoading}
				>
					{isLoading ? 'Wait' : 'Login'}
				</button>
			</form>
		</div>
	);
}

export default LoginForm;
