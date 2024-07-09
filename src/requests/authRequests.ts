import { LoginRequestDto, RegisterRequestDto } from "@/models/dtos/request/userRequestDto";
import User from "@/models/schemas/user";
import { getUsersFromLocalStorage, saveUsersToLocalStorage, setIdLoggedIn } from "@/services/localStorage";

export const login = async (payload: LoginRequestDto): Promise<string> => {
    const { email, password } = payload;
    const existingUsers = getUsersFromLocalStorage();
    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (user) {
        const id = String(user.id);
        setIdLoggedIn(id);
        return id;
    } else {
        throw new Error('Username not found');
    }
}

export const register = async (payload: RegisterRequestDto): Promise<string> => {
    const { email, password, name } = payload;

    const existingUsers = getUsersFromLocalStorage();
    const userExists = existingUsers.some(user => user.email === email);
    
    if (userExists) {
        throw new Error('Username already exists');
    }

    const newUser: User = {
        id: String(Date.now()),
        email,
        password,
        name
    };

    const updatedUsers = [...existingUsers, newUser];
    saveUsersToLocalStorage(updatedUsers);

    return String(newUser.id)
};
