import {Dom, HtmlData} from './Dom';

export default class Component<K extends keyof HTMLElementTagNameMap> {
    protected element: HTMLElementTagNameMap[K];

    constructor(tag: K, props: Omit<HtmlData<K>, 'tag'> = {}) {
        this.element = Dom.create({tag, ...props});
    }

    addClassName(...className: string[]) {
        this.element.classList.add(...className);
    }

    event<K extends keyof HTMLElementEventMap>(
        event: K,
        callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
    ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.element.addEventListener(event, callback);
    }

    getElement() {
        return this.element;
    }

    mount(parent: HTMLElement) {
        parent.appendChild(this.element);
    }
}
