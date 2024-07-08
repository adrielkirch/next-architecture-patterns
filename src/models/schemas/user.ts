
export interface UserConstructor {
    id?: number | null
    email?: string | null
    name?: string | null
    password?: string | null
}

export default class User {
    public id: string | null = null
    public email: string | null = null
    public name: string | null = null
    public password: string | null = null

    constructor(props?: UserConstructor) {
        Object.assign(this, props)
    }
}
