import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../components/AuthContext';
import { jwtDecode } from 'jwt-decode';

async function User() {
	const { accessToken } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState(true);
	const [username, setUsername] = useState('');

	useEffect(() => {
		const decodedToken = jwtDecode(accessToken);
		setUsername(decodedToken.username);
	}, []);

	const userRole = await fetch('http://localhost:4000/role', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username }),
	});

	if (userRole === 'user') {
		setIsVisible(false);
	}

	return (
		<div className="flex-container-user">
			<img
				className="img-page"
				src="https://picsum.photos/200"
				alt="Placeholder"
			/>{' '}
			<div className="flexbox-user-infos">
				<h1>Welcome {username}!</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
					laborum ratione, neque laboriosam tempore deserunt, excepturi
					aspernatur dicta, officia facilis fugit error? Amet pariatur porro
					odio dicta obcaecati at laudantium!
				</p>
				<div className="half-size">
					<div className="settings-box">
						<form>
							<h2 className="label-userpage">Add User</h2>
							<label className="label-userpage">Username</label>
							<div className="settings-box-sub">
								<input
									className="login-input login-input-size"
									type="email"
									name="email"
									id="email"
									placeholder="Username"
									required=""
								/>
								<button
									className="button-layout button-box display-none"
									type="button"
								>
									Create
								</button>
							</div>
							<label className="label-userpage">Password</label>
							<div className="settings-box-sub">
								<input
									className="login-input login-input-size"
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									required=""
								/>
								<button className="button-layout button-box" type="button">
									Create
								</button>
							</div>
						</form>
					</div>
					<div className="settings-box">
						<label className="label-userpage">Background color</label>
						<div className="settings-box-sub">
							<select
								className="login-input login-input-size"
								name="background"
								id="background"
							>
								<option value="blue">blue</option>
								<option value="magenta">magenta</option>
							</select>
							<button className="button-layout button-box" type="button">
								Apply
							</button>
						</div>
					</div>
					<Link to="/Login">
						<button className="button-layout" type="button">
							Logout
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default User;
