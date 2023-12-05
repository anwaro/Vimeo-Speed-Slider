import Component from './Component';

export class Slider extends Component<HTMLInputElement> {
    static MIN = 0.5;
    static MAX = 4;

    constructor(speed: number) {
        super(document.createElement('input'));

        this.setParams({
            type: 'range',
            min: Slider.MIN,
            max: Slider.MAX,
            step: 0.05,
            value: speed.toString(),
        });

        this.setClassName('vis-slider');

        this.setStyle({
            background: '#ffffff66',
            width: 'calc(100% - 30px)',
            height: '6px',
            outline: 'none',
            margin: '0 10px',
            padding: '0',
            'border-radius': '3px',
        });

        this.addStyle(`
            .vis-slider {
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
            }`);
    }

    setSpeed(speed: number) {
        this.element.value = speed.toString();
    }

    getSpeed(): number {
        return parseFloat(this.element.value);
    }
}
