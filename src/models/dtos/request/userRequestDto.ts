
export interface LoginRequestDtoConstructor {
    email?: string | null
    password?: string | null
}

export  class LoginRequestDto {
    public email: string | null = null
    public password: string | null = null

    constructor(props?: LoginRequestDtoConstructor) {
        Object.assign(this, props)
    }
}


interface RegisterRequestDtoConstructor {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export class RegisterRequestDto {
    public email: string | null = null
    public name: string | null = null
    public password: string | null = null
    public confirmPassword: string | null = null

    constructor(props?: RegisterRequestDtoConstructor) {
        Object.assign(this, props)
    }
}