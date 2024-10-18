import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';

function User() {
	const navigate = useNavigate();
	const { backgroundColor, setBackgroundColor } = useContext(AppContext);
	const { username, setUsername } = useContext(AppContext);
	const { role, setRole } = useContext(AppContext);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const request = await fetch('http://localhost:4000/user', {
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				const response = await request.json();
				if (response.username) {
					setUsername(response.username);
					setRole(response.role);
					setBackgroundColor(response.bgColor);
				} else {
					navigate('/Login');
				}
			} catch (error) {
				console.error('Error:', error);
			}
		};

		// const fetchBgColor = async () => {
		// 	try {
		// 		const response = await fetch('http://localhost:4000/getbgcolor', {
		// 			credentials: 'include',
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 			},
		// 		});

		// 		const data = await response.json();
		// 		setBackgroundColor(data.value);
		// 	} catch (error) {
		// 		console.error('Error:', error);
		// 	}
		// };

		fetchUser();
		// fetchBgColor();
		document.body.style.backgroundColor = backgroundColor;
	}, [username]);

	const handleClickLogoff = async (e) => {
		// const userConfirmed = window.confirm('Are you sure you want to Log out?');
		const userConfirmed = true;
		if (userConfirmed) {
			setRole('');
			setUsername('');
			setBackgroundColor('#89d1c8');
			await fetch('http://localhost:4000/logout', {
				method: 'POST',
				credentials: 'include',
			});
			navigate('/Login');
		} else {
			return;
		}
	};

	const handleChangeBg = async (e) => {
		e.preventDefault();
		setBackgroundColor(e.target.value);
		document.body.style.backgroundColor = backgroundColor;
		try {
			await fetch('http://localhost:4000/setbgcolor', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: 'bgColor', value: backgroundColor }),
			});
		} catch (error) {
			console.error('Error ', error);
		}
	};

	return (
		<div>
			<div className="flex-container-user">
				<img
					className="img-page"
					src="https://picsum.photos/200"
					alt="Placeholder"
				/>
				<div className="flexbox-user-infos">
					<h1>Welcome {username}!</h1>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
						laborum ratione, neque laboriosam tempore deserunt, excepturi
						aspernatur dicta, officia facilis fugit error? Amet pariatur porro
						odio dicta obcaecati at laudantium!
					</p>
					<div className="half-size">
						{role === 'admin' && (
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
											autoComplete="new-username"
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
											autoComplete="new-password"
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
							<form onSubmit={handleChangeBg}>
								<label className="label-userpage">Background color</label>
								<div className="settings-box-sub">
									<select
										className="login-input login-input-size"
										name="background"
										id="background"
										value={backgroundColor}
										onChange={(e) => setBackgroundColor(e.target.value)}
									>
										<option value="red">red</option>
										<option value="blue">blue</option>
									</select>
									<button className="button-layout button-box" type="submit">
										Apply
									</button>
								</div>
							</form>
						</div>

						<button
							onClick={handleClickLogoff}
							className="button-layout"
							type="button"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default User;
