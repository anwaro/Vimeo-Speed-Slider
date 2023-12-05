export default class Component<E extends HTMLElement> {
    protected element: E;

    constructor(element: E) {
        this.element = element;
    }

    addStyle(styles: string) {
        const id = 'vis-style';
        const style =
            document.getElementById(id) ||
            (function () {
                const style = document.createElement('style');
                style.id = id;
                document.head.appendChild(style);
                return style;
            })();
        style.innerHTML += styles;
    }

    setStyle(styles: Record<string, string | number>) {
        Object.entries(styles).forEach(([key, value]) => {
            this.element.style.setProperty(key, `${value}`);
        });
    }

    setParams(params: Record<string, string | number | boolean | undefined>) {
        Object.entries(params).forEach(([key, value]) => {
            let _value = `${value}`;

            if (value === undefined || value === false) {
                _value = '';
            }

            this.element.setAttribute(key, _value);
        });
    }

    setClassName(clasName: string) {
        this.element.className = clasName;
    }

    event<K extends keyof HTMLElementEventMap>(
        event: K,
        callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
    ) {
        this.element.addEventListener(event, callback);
    }

    getElement() {
        return this.element;
    }
}
