import Component from './Component';

export class Checkbox extends Component<'input'> {
    constructor(checked: boolean) {
        super('input', {
            styles: {
                accentColor: 'var(--color-two)',
                appearance: 'auto',
                width: '16px',
                height: '16px',
                margin: '0',
                padding: '0',
            },
            attrs: {
                type: 'checkbox',
                title: 'Remember speed',
                checked: checked,
            },
        });
    }

    initEvents(onChange: (state: boolean) => void) {
        this.event('change', () => onChange(this.element.checked));
    }

    setValue(checked: boolean) {
        this.element.checked = checked;
    }
}
