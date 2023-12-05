import {MenuSpeedItem} from './MenuSpeedItem';

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

    static menuLabel() {
        return Elements.menuItem()?.querySelector<HTMLDivElement>('span');
    }

    static menuSpeedItem() {
        return [
            ...document.querySelectorAll<HTMLDivElement>(
                '[data-menu="prefs"] [class^=MenuOption_module_option]',
            ),
        ].find((e) => /Speed/.test(e.innerText) && e.id !== MenuSpeedItem.ID);
    }

    static dock() {
        return Elements.ref<HTMLDivElement>('.vp-sidedock');
    }

    static dockItem() {
        return Elements.ref<HTMLDivElement>('.vp-sidedock>div');
    }

    static dockItemButton() {
        return Elements.ref<HTMLButtonElement>('.vp-sidedock>div>button');
    }

    static dockItemLabel() {
        return Elements.ref<HTMLLabelElement>('.vp-sidedock>div>label');
    }

    static video() {
        return Elements.ref<HTMLVideoElement>('.vp-video video');
    }
}
