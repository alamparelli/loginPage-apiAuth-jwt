import React from 'react';

function User() {
	return (
		<div class="flex-container-user">
			<img class="img-page" src="https://picsum.photos/200" alt="Placeholder" />{' '}
			<div class="flexbox-user-infos">
				<h1>Welcome User!</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
					laborum ratione, neque laboriosam tempore deserunt, excepturi
					aspernatur dicta, officia facilis fugit error? Amet pariatur porro
					odio dicta obcaecati at laudantium!
				</p>
				<div class="half-size">
					<div class="settings-box">
						<h2 class="label-userpage">Add User</h2>
						<label class="label-userpage">UserName</label>
						<div class="settings-box-sub">
							<input
								class="login-input login-input-size"
								type="email"
								name="email"
								id="email"
								placeholder="Username"
								required=""
							/>
							<button
								class="button-layout button-box display-none"
								type="button"
							>
								Create
							</button>
						</div>
						<label class="label-userpage">Password</label>
						<div class="settings-box-sub">
							<input
								class="login-input login-input-size"
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								required=""
							/>
							<button class="button-layout button-box" type="button">
								Create
							</button>
						</div>
					</div>
					<div class="settings-box">
						<label class="label-userpage">Background Color</label>
						<div class="settings-box-sub">
							<select
								class="login-input login-input-size"
								name="background"
								id="background"
							>
								<option value="blue">blue</option>
								<option value="magenta">magenta</option>
							</select>
							<button class="button-layout button-box" type="button">
								Apply
							</button>
						</div>
					</div>
					<button class="button-layout" type="button">
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

export default User;
