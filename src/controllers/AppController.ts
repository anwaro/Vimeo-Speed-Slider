import {Slider} from '../components/Slider';
import {Checkbox} from '../components/Checkbox';
import {Store} from '../data/Store';
import {MenuSpeedItem} from '../components/MenuSpeedItem';
import {Player} from '../components/Player';
import {Observer} from './Observer';
import {DockItem} from '../components/DockItem';
import {Elements} from "../components/Elements";

export class AppController {
    private player: Player;
    private menuSlider: Slider;
    private dockSlider: Slider;
    private menuCheckbox: Checkbox;
    private dockCheckbox: Checkbox;
    private dockItem: DockItem;
    private menuSpeedItem: MenuSpeedItem;
    private observer: Observer;

    private rememberSpeed: Store<boolean>;
    private speed: Store<number>;

    constructor() {
        this.rememberSpeed = new Store('vis-remember-speed');
        this.speed = new Store('vis-speed');
        const initialSpeed = this.getSpeed();

        this.player = new Player(initialSpeed);
        this.menuSlider = new Slider(initialSpeed);
        this.dockSlider = new Slider(initialSpeed);
        this.menuCheckbox = new Checkbox(this.rememberSpeed.get(false));
        this.dockCheckbox = new Checkbox(this.rememberSpeed.get(false));

        this.dockItem = new DockItem(
            this.dockSlider.getElement(),
            this.dockCheckbox.getElement(),
        );

        this.menuSpeedItem = new MenuSpeedItem(
            this.menuSlider.getElement(),
            this.menuCheckbox.getElement(),
        );

        this.observer = new Observer();
        this.initEvents();
        this.updateSpeed(initialSpeed);
    }

    initEvents() {
        this.dockSlider.event('change', this.sliderChangeEvent.bind(this));
        this.menuSlider.event('change', this.sliderChangeEvent.bind(this));
        this.dockSlider.event('input', this.sliderChangeEvent.bind(this));
        this.menuSlider.event('input', this.sliderChangeEvent.bind(this));
        this.dockSlider.event('wheel', this.sliderWheelEvent.bind(this));
        this.menuSlider.event('wheel', this.sliderWheelEvent.bind(this));
        this.dockCheckbox.event('change', this.checkboxEvent.bind(this));
        this.menuCheckbox.event('change', this.checkboxEvent.bind(this));
        // document.addEventListener('spfdone', this.initApp.bind(this));
    }

    sliderChangeEvent(e: Event) {
        this.updateSpeed(parseFloat((e.target as HTMLInputElement).value));
    }

    checkboxEvent(e: Event) {
        const checked = (e.target as HTMLInputElement).checked;
        this.rememberSpeed.set(checked);
        this.dockCheckbox.setValue(checked);
        this.menuCheckbox.setValue(checked);
    }

    sliderWheelEvent(event: WheelEvent) {
        const current = parseFloat((event.target as HTMLInputElement).value);
        const diff = event.deltaY > 0 ? -0.05 : 0.05;
        const value = Math.max(Slider.MIN, Math.min(current + diff, Slider.MAX));

        if (current != value) {
            this.updateSpeed(value);
        }
        event.preventDefault();
    }

    updateSpeed(speed: number) {
        this.speed.set(speed);
        this.player.setSpeed(speed);
        this.menuSpeedItem.updateSpeed(speed);
        this.dockItem.updateSpeed(speed);
        this.dockSlider.setSpeed(speed);
        this.menuSlider.setSpeed(speed);
    }

    getSpeed() {
        return this.rememberSpeed.get(false) ? this.speed.get(1) : 1;
    }

    mutationCallback() {
        this.initApp();
    }

    initApp() {
        this.player.setSpeed(this.getSpeed());

        const video = Elements.video();
        if (video) {
            this.observer.start(video, this.mutationCallback.bind(this));
        }

        this.menuSpeedItem.mount();

        return this.dockItem.mount();
    }
}
