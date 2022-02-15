import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LionField, Required } from '@lion/form-core';

function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[lionRequired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NgLionRequiredValidatorDirctive, multi: true }]
})
export class NgLionRequiredValidatorDirctive implements Validator, OnInit, OnChanges {
  @Input('lionRequired') message = '';

  private lionValidator = new Required();

  constructor(private elementRef: ElementRef<LionField>) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.validators.push(this.lionValidator);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']?.currentValue != null) {
      this.lionValidator.config['getMessage'] = () => Promise.resolve(this.message);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const errors = this.elementRef.nativeElement.validationStates['error'];
    if (!errors?.['Required']) {
      return null;
    }
    return { required: { value: control.value } };
  }
}