import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  sub: Subscription;
  id: number;
  form: FormGroup;
  image: string;
  sub2: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: AppService,
    private router: Router,
    private dialogService: DialogService,
    private dialog: MatDialog
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
    this.eventRedirect();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
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
          this.dialogService.editDialog(this.dialog, this.form.value, this.id);
      } else {
        Object.keys(this.form.controls).forEach(field => {
          const control = this.form.get(field);
          control.markAsDirty();
        });
      }
  }

  eventRedirect() {
    this.sub2 = this.dialogService.emitt.subscribe(() => this.router.navigate(['']));
  }

  resetField() {
    this.form.reset();
  }
}
