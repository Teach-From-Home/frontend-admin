export class User{
    name:string
    lastName:string
    dni:number
    email:string
    active:boolean

    static fromJson(userJson): User {
        return Object.assign(new User(), userJson)
    }
}