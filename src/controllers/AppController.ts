import {Store} from '../data/Store';
import {MenuItem} from '../components/MenuItem';
import {Player} from '../components/Player';
import {Observer} from './Observer';
import {Elements} from '../components/Elements';

export class AppController {
    private player = new Player();
    private item: MenuItem;
    private videoObserver = new Observer();
    private menuObserver = new Observer();

    private rememberSpeed: Store<boolean>;
    private speed: Store<number>;

    constructor() {
        this.rememberSpeed = new Store('vis-remember-speed');
        this.speed = new Store('vis-speed');
        this.item = new MenuItem(
            this.setSpeed.bind(this),
            this.setRemember.bind(this),
        );
        this.setSpeed(this.getSpeed());
        this.setRemember(this.rememberSpeed.get(false));
    }

    setSpeed(speed: number) {
        this.speed.set(speed);
        this.player.setSpeed(speed);
        this.item.setSpeed(speed);
    }

    setRemember(state: boolean) {
        this.rememberSpeed.set(state);
        this.item.setRemember(state);
    }

    getSpeed() {
        return this.rememberSpeed.get(false) ? this.speed.get(1) : 1;
    }

    mount() {
        this.item.mountItem();
    }

    init() {
        const video = Elements.video();
        const menu = Elements.menu();
        if (video && menu) {
            this.videoObserver.start(video, this.mount.bind(this));
            this.menuObserver.start(menu, this.mount.bind(this));
            this.mount();
            this.setSpeed(this.getSpeed());
            return true;
        }

        return false;
    }
}
