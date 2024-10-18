import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Login() {
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('http://localhost:4000/user', {
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				const data = await response.json();
				if (data.username) {
					navigate('/User');
				}
			} catch (error) {}
		};

		fetchUser();
	}, []);

	return (
		<div className="flex-container">
			<div className="login-box">
				<img src="https://picsum.photos/200" alt="Placeholder" />
				<Link to="/LoginForm">
					<button className="button-layout button-box">Login</button>
				</Link>
			</div>
		</div>
	);
}

export default Login;
