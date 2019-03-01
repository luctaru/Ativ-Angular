import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  empty = new FormControl('', [Validators.required, Validators.minLength(3)]);
  emptySurname = new FormControl('', [Validators.required, Validators.minLength(3)]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getErrorMessageEmpty() {
    if (this.empty.hasError('required')) {
      return 'You must enter a valid value';
    }
    if (this.empty.hasError('minlength')) {
      return 'You must enter a valid value';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
