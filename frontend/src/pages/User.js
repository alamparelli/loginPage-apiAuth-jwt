import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';

function User() {
	const navigate = useNavigate();
	const { backgroundColor, setBackgroundColor } = useContext(AppContext);
	const { username, setUsername } = useContext(AppContext);
	const { role, setRole } = useContext(AppContext);
	const [newUser, setNewUser] = useState({
		username: '',
		password: '',
		role: 'user',
	});

	useEffect(() => {
		if (backgroundColor) {
			document.body.style.backgroundColor = backgroundColor;
		}
	}, [backgroundColor]);

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

		fetchUser();
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

	const handleSubbmitNewUser = async (e) => {
		e.preventDefault();
		try {
			await fetch('http://localhost:4000/register', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});
			console.log(newUser);
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
								<form onSubmit={handleSubbmitNewUser}>
									<h2 className="label-userpage">Add User</h2>
									<label htmlFor="roleNew" className="label-userpage">
										Role
									</label>
									<div className="settings-box-sub">
										<select
											className="login-input login-input-size"
											name="roleNew"
											id="roleNew"
											value={newUser.role}
											onChange={(e) =>
												setNewUser({ ...newUser, role: e.target.value })
											}
										>
											<option value="user">User</option>
											<option value="admin">Admin</option>
										</select>
									</div>
									<label htmlFor="emailNew" className="label-userpage">
										Username
									</label>
									<div className="settings-box-sub">
										<input
											className="login-input login-input-size"
											type="email"
											name="emailNew"
											id="emailNew"
											placeholder="Username"
											value={newUser.email}
											autoComplete="new-username"
											onChange={(e) =>
												setNewUser({ ...newUser, username: e.target.value })
											}
											required
										/>
										<button
											className="button-layout button-box display-none"
											type="button"
										>
											Create
										</button>
									</div>
									<label htmlFor="passwordNew" className="label-userpage">
										Password
									</label>
									<div className="settings-box-sub">
										<input
											className="login-input login-input-size"
											type="password"
											name="passwordNew"
											id="passwordNew"
											placeholder="Password"
											autoComplete="new-password"
											value={newUser.password}
											onChange={(e) =>
												setNewUser({ ...newUser, password: e.target.value })
											}
											required
										/>
										<button className="button-layout button-box" type="submit">
											Create
										</button>
									</div>
								</form>
							</div>
						)}
						<div className="settings-box">
							<form onSubmit={handleChangeBg}>
								<label htmlFor="background" className="label-userpage">
									Background color
								</label>
								<div className="settings-box-sub">
									<select
										className="login-input login-input-size"
										name="background"
										id="background"
										value={backgroundColor}
										onChange={(e) => setBackgroundColor(e.target.value)}
									>
										<option value="blue">Blue</option>
										<option value="red">Red</option>
										<option value="green">Green</option>
										<option value="yellow">Yellow</option>
										<option value="orange">Orange</option>
										<option value="purple">Purple</option>
										<option value="pink">Pink</option>
										<option value="brown">Brown</option>
										<option value="black">Black</option>
										<option value="white">White</option>
										<option value="gray">Gray</option>
										<option value="cyan">Cyan</option>
										<option value="magenta">Magenta</option>
										<option value="lime">Lime</option>
										<option value="navy">Navy</option>
										<option value="teal">Teal</option>
										<option value="olive">Olive</option>
										<option value="maroon">Maroon</option>
										<option value="violet">Violet</option>
										<option value="indigo">Indigo</option>
										<option value="gold">Gold</option>
										<option value="silver">Silver</option>
										<option value="coral">Coral</option>
										<option value="aqua">Aqua</option>
										<option value="khaki">Khaki</option>
										<option value="plum">Plum</option>
										<option value="salmon">Salmon</option>
										<option value="turquoise">Turquoise</option>
										<option value="chocolate">Chocolate</option>
										<option value="tomato">Tomato</option>
										<option value="sienna">Sienna</option>
										<option value="orchid">Orchid</option>
									</select>
									<button className="button-layout button-box" type="submit">
										Save
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
