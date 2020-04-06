# Angular Forms Deep Dive

Example app with complex multilevel forms. The example scenario is based around a shopping cart app. 
The demo is not design to look pretty! Instead the intent is show the limitations of reactive forms and 
ways to work around them. 

## Business Requirements
The customer can only navigate to the next screen when their cart is valid.
The cart is valid if the customer is valid and the order line has a valid quantity. 
The customer can also change the quantity of each order line and different products use different 
units to describe quantity so the customer experience must provide optimized editing of the quantities.
A required optimization is the default quantity editor should have 2 buttons for increment/decrement the quantity 
and the relevant button should be disabled if the quantity is at its max/min value ex max quantity is 10 so the plus button is disabled but minus is not.  
The quantity editor ux optimization is not negotiable. 

## Engineering design goals
- strong typing
- separation of concerns and well encapsulated components that do not leak there implementation details.
- Do not couple the form implementation to the ngrx data store. The general idea is [Separated Presentation](https://martinfowler.com/eaaDev/SeparatedPresentation.html)
- ergonomic & maintainable patterns for:
    - validation and a parent form is invalid if the child is invalid. Cross form and async validators must be demonstrated. 
    - error handling and surfacing/displacing child component errors at the parent.
    - adding additional custom form components
- allow reuse of base components such as the quantity editor
   

## implementations

### plain reactive forms

#### error handling vs validation
- where to do validation? Lets dive into the default quantity editor component.
 Generally I want to let the validation happen close to the parent/root so that error handling is easier 
 and custom controls remain agnostic of buisness logic so they are more reusable. So, I want to 
 the `OrderLineComponent` and `QuantityEditorComponent` to look something like [A] but instead must be implemented as [B]. 
 ```
@Component({
  template: `
      <form [formGroup]="orderLineForm">
          <app-quantity-editor [formControl]="quantity"
                               [unitOfMeasure]="unitOfMeasure">
          </app-quantity-editor>
      </form>
  `,
})
export class OrderLineComponent {
  readonly orderLineForm = this.fb.group({
    quantity: [1, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ]]
  });
}
```  




### ngx-sub-forms

### ngneat/form-manager

### ngrx-forms


## useful links

- [ngx-sub-forms post](https://dev.to/maxime1992/building-scalable-robust-and-type-safe-forms-with-angular-3nf9)
- [ngx-sub-forms github](https://github.com/cloudnc/ngx-sub-form)
- [ngx-sub demo](https://cloudnc.github.io/ngx-sub-form/)
- [ngrx-forms docs](https://ngrx-forms.readthedocs.io/en/master/user-guide/)
- https://medium.com/@amcdnl/reactive-angular-forms-with-ngrx-533a2f28c127
- [github issue for proposal to improve reactive forms](https://github.com/angular/angular/issues/31963)
- [github repo implementation of proposed v2 of reactive forms](https://github.com/thefliik/reactive-forms-2-proposal)
- [PR to type ControlValueAccessor](https://github.com/angular/angular/pull/31801) this is an unfortunate breaking change
- [github issues for exposing form errors](https://github.com/angular/angular/issues/10530)


## how this project was setup from scratch
- `ng new $name`
- `yarn ng add ng-zorro-antd`
- `yarn add uuid`
- `yarn add @compodoc/compodoc @types/uuid tslint-angular tslint-config-prettier tslint-immutable --dev`
- update `tslint.json` and `tsconfig.json` to desired settings
- `yarn ng add @ngrx/store`
- `yarn ng add @ngrx/store-devtools`
- `yarn ng add @ngrx/entity`
- `yarn ng g entity order-line --reducers/index.ts` and move to correct folder and repeat for product and customer

