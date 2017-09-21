
export class UserCredentials {

    public userIdentifier:string;
    public password:string;

    constructor(userIdentifier:string ="", password:string=""){
        this.userIdentifier = userIdentifier;
        this.password = password;
    }
}
