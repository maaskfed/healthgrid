import { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [users, setUsers] = useState();

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
