import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
	const [role, setRole] = useState('');
	const [username, setUsername] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('#89d1c8');

	return (
		<AppContext.Provider
			value={{
				role,
				setRole,
				username,
				setUsername,
				backgroundColor,
				setBackgroundColor,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
