import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Required } from '@lion/form-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lion-playground';

  required = new Required({}, { getMessage: () => Promise.resolve('get your shit together') });

  formGrp: FormGroup;

  constructor(fb: FormBuilder) {
    this.formGrp = fb.group({
      text: ['!!!']
    });
  }
}
