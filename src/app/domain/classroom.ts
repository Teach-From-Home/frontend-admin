import { User } from './user'
import { Subject } from './subject'

export class Classroom{
    id:string
    name:string
    description:string=""
    active:boolean = true
    subject:Subject
    users:User[]

    static fromJson(classroomJson): Classroom {
        return Object.assign(new Classroom(), classroomJson)
    }

    

}