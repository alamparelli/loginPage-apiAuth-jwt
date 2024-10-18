import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../components/AuthContext';
import { jwtDecode } from 'jwt-decode';

function User() {
	const navigate = useNavigate();
	const { accessToken, setAccessToken } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState(true);
	const { username, setUsername } = useContext(AuthContext);
	const { role, setRole } = useContext(AuthContext);

	useEffect(() => {
		const getCookie = async () => {};

		if (accessToken) {
			const decodedToken = jwtDecode(accessToken);
			setUsername(decodedToken.username);

			const fetchUserRole = async () => {
				try {
					const response = await fetch('http://localhost:4000/role', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ username }),
					});

					const data = await response.json();
					setRole(data.role);
					setIsVisible(data.role === 'user');
				} catch (error) {
					console.error('Error fetching user role:', error);
				}
			};

			if (username) {
				fetchUserRole();
			}
		} else {
			navigate('/Login');
		}
	}, [accessToken, username, setRole, setUsername]);

	const handleClickLogoff = async (e) => {
		const userConfirmed = window.confirm('Are you sure you want to Log out?');
		if (userConfirmed) {
			setAccessToken('');
			setRole('');
			navigate('/Login');
		} else {
			return;
		}
	};

	const handleSubmitChgBackgroundColor = async (e) => {};
	const handleSubmitAddUsers = async (e) => {};

	return (
		<div className="flex-container-user">
			<img
				className="img-page"
				src="https://picsum.photos/200"
				alt="Placeholder"
			/>
			<div className="flexbox-user-infos">
				<h1>Welcome {role}!</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
					laborum ratione, neque laboriosam tempore deserunt, excepturi
					aspernatur dicta, officia facilis fugit error? Amet pariatur porro
					odio dicta obcaecati at laudantium!
				</p>
				<div className="half-size">
					{!isVisible && (
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
					)}
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

					<button
						onClick={handleClickLogoff}
						className="button-layout"
						type="button"
					>
						Logout
					</button>

					<Link to="/User2">
						<button className="button-layout" type="button">
							User2
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default User;
