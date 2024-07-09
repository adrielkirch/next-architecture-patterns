import User from "@/models/schemas/user";

const dbKey = 'users';
export const getUsersFromLocalStorage = (): User[] => {
    const usersJson = localStorage.getItem(dbKey);
    return usersJson ? JSON.parse(usersJson) : [];
};
export const saveUsersToLocalStorage = (users: User[]): void => {
    localStorage.setItem(dbKey, JSON.stringify(users));
};

export const setIdLoggedIn = (id:string): void => {
    localStorage.setItem("id",id);
};

export const getSession = (): string => {
    return String(localStorage.getItem("id"));
};