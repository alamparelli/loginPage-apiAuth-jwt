import React from 'react';

function LoginForm() {
	return (
		<div class="flex-container">
			<form class="login-box login-box-color">
				<input
					class="login-input"
					type="email"
					name="email"
					id="email"
					placeholder="Username"
					required=""
				/>

				<input
					class="login-input"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					required=""
				/>
				<div>
					<button class="button-layout button-box">Login</button>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
