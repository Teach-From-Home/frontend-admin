export class User{
    id:string
    name:string
    lastName:string
    dni:number
    password:string
    email:string
    active:boolean

    static fromJson(userJson): User {
        return Object.assign(new User(), userJson)
    }
}