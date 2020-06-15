export class Subject{
    id:string
    name:string
    description:string=""
    active:boolean = true

    static fromJson(subjectJson): Subject {
        return Object.assign(new Subject(), subjectJson)
    }
}