import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  sub: Subscription;
  id: number;
  form: FormGroup;
  image: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: AppService,
    private router: Router
    ) {
    this.form = this.formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      gender: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      isFavorite: [null],
      info: this.formBuilder.group({
        address: [null, [Validators.required, Validators.minLength(3)]],
        phone: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[0-9]*$')]],
        company: [null, [Validators.required, Validators.minLength(3)]],
        comments: [null],
        avatar: [null]
      })
    });
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        this.id = params.id;
        console.log(this.id);
        if (this.id) {
          this.insertData(this.id);
        } else {
          this.image = 'http://localhost:4200/assets/avatar-icon.png';
        }
    });
  }

  changeImg() {
    this.image = 'https://trello-attachments.s3.amazonaws.com/5c59af35f317007fe99fe41d/300x300' +
    '/6e705f3f6e67829783f04d8b55a26c52/lucas-tarumoto-01.jpg';
    this.form.get('info').get('avatar').setValue(this.image);
  }

  insertData(id) {
    this.service.getOne(id).subscribe(d => {
      console.log(d);
      this.form.patchValue(d);
      this.image = d.info.avatar;
    });
  }

  onSubmit() {
      if (this.form.valid) {
        if (this.id) {
          console.log('id on');
          this.service.update(this.form.value, this.form.get('isFavorite').value).subscribe();
          this.router.navigate(['']);
        } else {
          console.log('id off');
          this.form.get('isFavorite').setValue(false);
          this.service.insert(this.form.value).subscribe();
          this.router.navigate(['']);
        }
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
