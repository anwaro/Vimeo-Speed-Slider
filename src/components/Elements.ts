import {MenuItem} from './MenuItem';

export class Elements {
    static ref<T extends HTMLElement>(selector: string): T | null {
        return document.querySelector<T>(selector);
    }

    static menu() {
        return Elements.ref<HTMLDivElement>(
            '[data-menu="prefs"] [class^=Menu_module_menuPanel]',
        );
    }

    static menuItem() {
        return Elements.ref<HTMLDivElement>(
            '[data-menu="prefs"] [class^=Menu_module_menuPanel] [class^=MenuOption_module_option]',
        );
    }

    static menuSpeedItem() {
        const optionItems = [
            ...document.querySelectorAll<HTMLDivElement>(
                '[data-menu="prefs"] [class^=MenuOption_module_option]',
            ),
        ];
        const speedLabels = [
            'Speed',
            'Velocidad',
            'Geschwindigkeit',
            'Vitesse',
            'Velocidade',
            'スピード',
            '속도',
        ];

        return optionItems.find(
            (e) =>
                e.id !== MenuItem.ID &&
                speedLabels.some((text) => e.innerText.includes(text)),
        );
    }

    static menuSpeedLabel() {
        return Elements.menuSpeedItem()?.querySelector<HTMLSpanElement>('span');
    }

    static video() {
        return Elements.ref<HTMLVideoElement>('.vp-video video');
    }
}
