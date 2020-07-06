### Simple Angular 10 modal
Demo https://oleg-an.github.io/modal/

lcg-modal.spec.ts contains tests

Import ModalModule
```js
imports: [
    ModalModule
],
```

Create modal component, a model for data

```js
@Component({
    selector: 'simple-modal-example',
    template: `
        Amount: {{data?.amount}} <br>
        You can close this modal by ESC or close button<br>

        <button (click)="close()" style="margin-top: 10px">
            Close
        </button>
        <button (click)="approve()">
            Approve
        </button>`
})
export class SimpleModalExampleComponent extends BaseModal<InfoModelParamsModel> {
}

export interface InfoModelParamsModel {
    amount: number;
}
```
Inject modal service
```js
constructor(private modal: Modal) {
}
```

Open modal and subscribe to events
```js
const modal = this.modal.open({
    title: 'Some title',
    data: {
        amount: 1000
    },
    component: SimpleModalExampleComponent
});

modal.$closed.subscribe(_ => {

});

modal.$approved.subscribe(_ => {

});
```
