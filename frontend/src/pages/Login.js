import { Link } from 'react-router-dom';

function Login() {
	return (
		<div class="flex-container">
			<div class="login-box">
				<img src="https://picsum.photos/200" alt="Placeholder" />
				<Link to="/LoginForm">
					<button class="button-layout button-box">Login</button>
				</Link>
			</div>
		</div>
	);
}

export default Login;
