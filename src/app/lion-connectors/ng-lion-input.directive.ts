import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { LionInput } from '@lion/input';

@Directive({
  selector: 'lion-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgLionInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NgLionInputDirective,
      multi: true
    }
  ]
})
export class NgLionInputDirective implements ControlValueAccessor, Validator {
  private internalValue?: string;

  constructor(private elementRef: ElementRef<LionInput>) { }

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this.internalValue;
  }

  set value(val) {
    if (val !== this.internalValue) {
      this.internalValue = val;
      this.onChange(this.internalValue);
      this.onTouched();
      this.elementRef.nativeElement.modelValue = val;
    }
  }

  @HostListener('model-value-changed', ['$event.detail'])
  listenForValueChange(detail: any) {
    if (!detail.isTriggeredByUser) {
      return;
    }
    this.value = this.elementRef.nativeElement.modelValue;
  }

  writeValue(value: string) {
    if (!value) {
      value = '';
    }
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.elementRef.nativeElement.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const errors = this.elementRef.nativeElement.validationStates['error'];
    if (!errors) {
      return null;
    }
    const vErrors: ValidationErrors = {};

    Object.keys(errors).forEach(key => {
      vErrors[key] = { value: control.value };
    });
    return vErrors;
  }
}