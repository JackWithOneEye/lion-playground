import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { LionInput } from '@lion/input';
import { LionInputDatepicker } from '@lion/input-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgLionInputDirective } from './lion-connectors/ng-lion-input.directive';
import { NgLionRequiredValidatorDirctive } from './lion-connectors/ng-lion-required.directive';

// function memoize(cache: WeakMap<object, any>) {
//   return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//       if (cache.has(args)) {
//         return cache.get(args);
//       }
//       const result = originalMethod.apply(this, args);
//       cache.set(args, result);
//       return result;
//     };
//     return descriptor;
//   };
// }

// function FunctionNameLogger() {
//   return function (
//     target: Object,
//     key: string | symbol,
//     descriptor: PropertyDescriptor
//   ) {
//     console.log(key);
//     return descriptor;
//   };
// }

customElements.define('lion-input', LionInput);
// @ts-ignore
customElements.define('lion-input-datepicker', LionInputDatepicker);

@NgModule({
  declarations: [
    AppComponent,
    NgLionRequiredValidatorDirctive,
    NgLionInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
