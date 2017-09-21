
export class UserCredentials {

    public userIdentifier:string;
    public email:string;
    public username:string;
    public password:string;

    constructor(userIdentifier:string ="", password:string="", email?:string, username?:string){
        this.userIdentifier = userIdentifier;
        this.password = password;
        this.email = email;
        this.username = username;
    }
}
