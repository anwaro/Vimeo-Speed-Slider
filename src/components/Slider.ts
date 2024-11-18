import Component from './Component';
import {GlobalStyle} from '../controllers/GlobalStyle';

export class Slider extends Component<'input'> {
    static MIN_VALUE = 0.5;
    static MAX_VALUE = 4;

    constructor() {
        super('input', {
            classes: 'vis-slider',
            attrs: {
                type: 'range',
                min: Slider.MIN_VALUE,
                max: Slider.MAX_VALUE,
                step: 0.05,
            },
            styles: {
                background: '#ffffff66',
                width: 'calc(100% - 30px)',
                height: '6px',
                outline: 'none',
                margin: '0 10px',
                padding: '0',
                borderRadius: '3px',
            },
        });

        GlobalStyle.addStyle(
            'vis-slider',
            `.vis-slider {
              -webkit-appearance: none;
            }

            .vis-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: var(--color-two);
              cursor: pointer;
            }

            .vis-slider::-moz-range-thumb {
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: var(--color-two);
              cursor: pointer;
            }`,
        );
    }

    initEvents(onChange: (speed: number) => void) {
        this.event('change', () => onChange(this.getSpeed()));
        this.event('input', () => onChange(this.getSpeed()));
        this.event('wheel', (event) => {
            event.stopPropagation();
            event.preventDefault();
            const diff = event.deltaY > 0 ? -0.05 : 0.05;
            onChange(this.getSpeed() + diff);
            return false;
        });
    }

    setSpeed(speed: number) {
        this.element.value = speed.toString();
    }

    getSpeed(): number {
        return parseFloat(this.element.value);
    }
}
