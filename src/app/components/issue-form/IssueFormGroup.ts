import { FormGroup, Validator } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';


export class IssueFormGroup extends FormGroup{

    constructor(){
        super({
            title: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(240)]),
            location: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(240)]),
            category: new FormControl("", [Validators.required]),
            priority: new FormControl("", [Validators.required])
        });
    }
   
}