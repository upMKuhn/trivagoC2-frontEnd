import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserCredentials } from "./UserCredentials";

export class LoginForm  extends FormGroup {


    private userIdentification_control:FormControl = new FormControl("", [Validators.minLength(2), Validators.required]);
    private password_control:FormControl = new FormControl("", [Validators.minLength(5), Validators.required]);
    private shouldRememberMe_control:FormControl = new FormControl(false);

    constructor(){
        super({});
        super.addControl('userIdentification', this.userIdentification_control)
        super.addControl('password', this.password_control)
        super.addControl('shouldRememberMe', this.shouldRememberMe_control)
    }

    public toUserCredentials() : UserCredentials {
        var userId = this.userIdentification_control.value;
        var password = this.password_control.value;
        return new UserCredentials(String(userId), String(password));
    }

}
