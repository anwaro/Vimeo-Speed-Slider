type HtmlAttr<K extends keyof HTMLElementTagNameMap> = Partial<
    Record<keyof HTMLElementTagNameMap[K], unknown>
>;

type HtmlEvents<E extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> =
    Partial<Record<E, (this: HTMLElement, ev: HTMLElementEventMap[E]) => void>>;

export type HtmlItem = HtmlData | HTMLElement;

export type HtmlData<
    K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
> = {
    tag: K;
    classes?: string;
    attrs?: HtmlAttr<K> & Record<string, unknown>;
    events?: HtmlEvents;
    styles?: Partial<CSSStyleDeclaration>;
    children?: (HtmlItem | SvgItem)[] | HtmlItem | SvgItem | string;
};

type SvgAttr<K extends keyof SVGElementTagNameMap> = Partial<
    Record<keyof SVGElementTagNameMap[K], unknown>
>;

type SvgEvents<E extends keyof SVGElementEventMap = keyof SVGElementEventMap> =
    Partial<Record<E, (this: HTMLElement, ev: SVGElementEventMap[E]) => void>>;

export type SvgItem = SvgData | SVGElement;

export type SvgData<
    K extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap,
> = {
    tag: K;
    classes?: string;
    attrs?: SvgAttr<K> & Record<string, string>;
    events?: SvgEvents;
    styles?: Partial<CSSStyleDeclaration>;
    children?: SvgItem[] | SvgItem | string;
};

export class Dom {
    static appendChildren(
        element: HTMLElement | SVGElement,
        children: HtmlData['children'],
    ) {
        if (typeof children === 'string') {
            element.innerHTML = children;
        } else if (children) {
            element.append(
                ...Dom.array(children).map((item) => {
                    if (item instanceof HTMLElement || item instanceof SVGElement) {
                        return item;
                    }
                    if (Dom.isSvgItem(item)) {
                        return Dom.createSvg(item);
                    }
                    return Dom.create(item);
                }),
            );
        }
    }

    static create<
        K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
    >(data: HtmlData<K>): HTMLElementTagNameMap[K] {
        const element = document.createElement(data.tag);

        Dom.appendChildren(element, data.children);
        Dom.applyClass(element, data.classes);
        Dom.applyAttrs(element, data.attrs);
        Dom.applyEvents(element, data.events);
        Dom.applyStyles(element, data.styles);

        return element;
    }

    static element<
        K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
    >(
        tag: K,
        classes?: string,
        children?: HtmlData<K>['children'],
    ): HTMLElementTagNameMap[K] {
        return Dom.create({tag, classes, children});
    }

    static createSvg<
        K extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap,
    >(data: SvgData<K>): SVGElementTagNameMap[K] {
        const element = document.createElementNS(
            'http://www.w3.org/2000/svg',
            data.tag,
        );

        Dom.appendChildren(element, data.children);
        Dom.applyClass(element, data.classes);
        Dom.applyAttrs(element, data.attrs);
        Dom.applyEvents(element, data.events);
        Dom.applyStyles(element, data.styles);

        return element;
    }

    static array<T>(element: T | T[]): T[] {
        return Array.isArray(element) ? element : [element];
    }

    static elementSvg<
        K extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap,
    >(
        tag: K,
        classes?: string,
        children?: SvgData<K>['children'],
    ): SVGElementTagNameMap[K] {
        return Dom.createSvg({tag, classes, children});
    }

    static applyAttrs(
        element: HTMLElement | SVGElement,
        attrs?: Record<string, unknown>,
    ) {
        if (attrs) {
            Object.entries(attrs).forEach(([key, value]) => {
                if (value === undefined || value === false) {
                    element.removeAttribute(key);
                } else {
                    element.setAttribute(key, `${value}`);
                }
            });
        }
    }

    static applyStyles(
        element: HTMLElement | SVGElement,
        styles?: Record<string, unknown>,
    ) {
        if (styles) {
            Object.entries(styles).forEach(([key, value]) => {
                const name = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
                element.style.setProperty(name, value as string);
            });
        }
    }

    static applyEvents(
        element: HTMLElement | SVGElement,
        events?: Record<string, EventListenerOrEventListenerObject>,
    ) {
        if (events) {
            Object.entries(events).forEach(([name, callback]) => {
                element.addEventListener(name, callback);
            });
        }
    }

    static applyClass(element: HTMLElement | SVGElement, classes?: string) {
        if (classes) {
            element.setAttribute('class', classes);
        }
    }

    static isSvgItem(item: SvgData | HtmlData): item is SvgData {
        try {
            const element = document.createElementNS(
                'http://www.w3.org/2000/svg',
                item.tag,
            );
            return element.namespaceURI === 'http://www.w3.org/2000/svg';
        } catch (error) {
            return false;
        }
    }
}
