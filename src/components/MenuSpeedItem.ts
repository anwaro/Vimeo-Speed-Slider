import Component from './Component';
import {Elements} from './Elements';

export class MenuSpeedItem extends Component<HTMLDivElement> {
    public static readonly ID = 'vis-menu-speed-item';
    private sliderWrapper = document.createElement('div');
    private label = document.createElement('span');

    constructor(slider: HTMLInputElement, checkbox: HTMLInputElement) {
        super(document.createElement('div'));

        this.setParams({id: MenuSpeedItem.ID});

        this.element.appendChild(this.label);
        this.sliderWrapper.appendChild(checkbox);
        this.sliderWrapper.appendChild(slider);
        this.element.appendChild(this.sliderWrapper);

        this.initWrapper()
    }

    initWrapper() {
        this.sliderWrapper.style.setProperty('display', 'flex');
        this.sliderWrapper.style.setProperty('align-items', 'center');
    }

    initClassNames() {
        if (this.element.className !== '') {
            return;
        }

        const menuItem = Elements.menuItem();
        if (menuItem) {
            this.setClassName(menuItem.className);
        }

        const menuLabel = Elements.menuLabel();
        if (menuLabel) {
            this.label.className = menuLabel.className;
        }
    }

    updateSpeed(speed: number) {
        this.label.innerText = `Speed: ${speed.toFixed(1)}`;
    }

    mount() {
        this.initClassNames();
        const defaultSpeedItem = Elements.menuSpeedItem();

        console.log(defaultSpeedItem);

        if (defaultSpeedItem) {
            defaultSpeedItem.style.setProperty('display', 'none');
        }

        if (Elements.ref(`#${MenuSpeedItem.ID}`)) {
            return true;
        }

        const menu = Elements.menu();

        if (menu) {
            menu.appendChild(this.element);
            return true;
        }
        return false;
    }
}
