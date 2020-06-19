### Simple Angular 9 modal

Import LcgModalModule
```js
imports: [
    ModalModule
],
```

Create modal component, a model for data

```js
@Component({
    selector: 'simple-modal-example',
    templateUrl: 'simple-modal-example.component.html',
    styleUrls: ['simple-modal-example.component.less']
})
export class SimpleModalExampleComponent extends BaseModal<InfoModelParamsModel> {
}

export interface InfoModelParamsModel {
    amount: number;
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
```
