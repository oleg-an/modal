### Simple Angular 9 modal
Demo https://oleg-an.github.io/modal/

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
    templateUrl: 'large-modal-example.component.html',
    styleUrls: ['large-modal-example.component.less']
})
export class LargeModalExampleComponent extends BaseModal<InfoModelParamsModel> {
}

export interface InfoModelParamsModel {
    amount: number;
}

```
Inject modal service
```js
private modal: Modal
```js

Open modal and subscribe to events
```js
const modal = this.modal.open({
    title: 'Some title',
    data: {
        amount: 1000
    },
    component: LargeModalExampleComponent
});

modal.$closed.subscribe(_ => {

});
```
