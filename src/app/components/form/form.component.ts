import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      surname: [null, [Validators.required, Validators.minLength(3)]],
      gender: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]*$')]],
      company: [null, [Validators.required, Validators.minLength(3)]],
      street: [null, [Validators.required, Validators.minLength(3)]],
      number: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      state: [null, [Validators.required, Validators.minLength(3)]],
      city: [null, [Validators.required, Validators.minLength(3)]],
      comment: [null]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty();
      });
    }
  }

  resetField() {
    this.form.reset();
  }
}
