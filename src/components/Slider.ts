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
                minWidth: '150px',
            },
        });

        GlobalStyle.addStyle(
            'vis-slider',
            `input[type='range'].vis-slider {
              -webkit-appearance: none;
            }

            input[type='range'].vis-slider::-moz-range-thumb ,
            input[type='range'].vis-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 6px;
              background: #fff;
              cursor: pointer;
              margin-top: -2px;
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
        this.updateBg(speed);
        this.element.value = speed.toString();
    }

    getSpeed(): number {
        return parseFloat(this.element.value);
    }

    updateBg(value: number) {
        const progress =
            ((value - Slider.MIN_VALUE) / (Slider.MAX_VALUE - Slider.MIN_VALUE)) *
            100;
        this.element.style.background =
            'linear-gradient(to right, COLOR1 0%, COLOR1 STEP%, COLOR2 STEP%, COLOR2 100%)'
                .replaceAll('COLOR1', 'var(--color-two)')
                .replaceAll('COLOR2', '#ffffff66')
                .replaceAll('STEP', progress.toFixed(1));
    }
}
