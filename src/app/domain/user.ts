import { Subject } from './subject'

export class User{
    id:string
    name:string
    lastname:string
    dni:number
    password:string
    email:string
    active:boolean
    subjects:Subject[] = []
    role:string

    static fromJson(userJson): User {
        return Object.assign(new User(), userJson)
    }

    
}