import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserCredentials } from '../login/UserCredentials';

export class RegisterForm  extends FormGroup {


    private username_control:FormControl = new FormControl("", [Validators.minLength(2), Validators.required]);
    private email_control:FormControl = new FormControl("", [Validators.minLength(2), Validators.required]);
    private password_control:FormControl = new FormControl("", [Validators.minLength(5), Validators.required]);

    constructor(){
        super({});
        super.addControl('username', this.username_control)
        super.addControl('email', this.email_control)
        super.addControl('password', this.password_control)
    }

    public toUserCredentials() : UserCredentials {
        var userId = this.username_control.value;
        var password = this.password_control.value;
        return new UserCredentials(String(userId), String(password), this.email_control.value, this.username_control.value);
    }

}
