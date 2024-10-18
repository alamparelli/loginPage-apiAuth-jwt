import React, { createContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState(null);
	const [role, setRole] = useState(null);
	const [username, setUsername] = useState(null);

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				setAccessToken,
				role,
				setRole,
				username,
				setUsername,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
