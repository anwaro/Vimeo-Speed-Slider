import Component from './Component';
import {Elements} from './Elements';

export class DockItem extends Component<HTMLDivElement> {
    static ID = 'vis-dock-item';
    private label = document.createElement('label');
    private button = document.createElement('button');
    private speedLabel = document.createElement('span');

    constructor(slider: HTMLInputElement, checkbox: HTMLInputElement) {
        super(document.createElement('div'));
        this.setParams({id: DockItem.ID});

        this.initLabel();
        this.initButton();

        this.label.appendChild(checkbox);
        this.label.appendChild(slider);
        this.label.appendChild(this.speedLabel);

        this.event('mouseenter', () => this.label.style.removeProperty('display'));
        this.event('mouseleave', () =>
            this.label.style.setProperty('display', 'none'),
        );
    }

    initLabel() {
        this.label.style.setProperty('display', 'none');
        this.element.appendChild(this.label);
    }

    initButton() {
        this.button.appendChild(this.getSvg());
        this.element.appendChild(this.button);
    }

    getSvg() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', '20');
        svg.setAttribute('width', '20');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.appendChild(this.getPolygon());
        return svg;
    }

    getPolygon() {
        const polygon = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'polygon',
        );
        polygon.setAttribute('fill', 'white');
        polygon.setAttribute('points', '2,1 2,19 11,10 11,19 20,10 11,1 11,10');
        return polygon;
    }

    initClassNames() {
        if (this.element.className !== '') {
            return;
        }

        const item = Elements.dockItem();

        if (item) {
            this.setClassName(item.className);
        }
        const dockButton = Elements.dockItemButton();
        if (dockButton) {
            this.button.className = dockButton.className;
            this.button.type = dockButton.type;
        }

        const dockLabel = Elements.dockItemLabel();
        if (dockLabel) {
            this.label.className = dockLabel.className;
            this.label.role = dockLabel.role;
        }
    }

    updateSpeed(speed: number) {
        this.speedLabel.innerText = speed.toFixed(1);
    }

    mount() {
        this.initClassNames();

        if (Elements.ref(`#${DockItem.ID}`)) {
            return true;
        }

        const dock = Elements.dock();

        if (dock) {
            dock.appendChild(this.element);
            return true;
        }
        return false;
    }
}
