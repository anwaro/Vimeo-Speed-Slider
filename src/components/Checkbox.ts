import Component from './Component';

export class Checkbox extends Component<HTMLInputElement> {
    constructor(checked: boolean) {
        super(document.createElement('input'));

        this.element.checked = checked;

        this.setParams({
            type: 'checkbox',
            title: 'Remember speed',
        });

        this.setStyle({
            'accent-color': 'var(--color-two)',
            appearance: 'auto',
            width: '16px',
            height: '16px',
            margin: '0',
            padding: '0',
        });
    }

    getValue() {
        return this.element.checked;
    }

    setValue(checked: boolean) {
        this.element.checked = checked;
    }
}
