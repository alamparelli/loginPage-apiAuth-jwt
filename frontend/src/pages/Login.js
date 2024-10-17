import { Link } from 'react-router-dom';

function Login() {
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
