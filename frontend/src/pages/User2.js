import { Link } from 'react-router-dom';

function User2() {
	return (
		<div className="flex-container">
			<div className="login-box">
				<Link to="/User">
					<button className="button-layout button-box">Back</button>
				</Link>
			</div>
		</div>
	);
}

export default User2;
