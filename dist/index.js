// ==UserScript==
// @name         Vimeo Player Speed Slider
// @namespace    vimeo_player_speed_slider
// @version      1.0.1
// @description  Add Speed Slider to Vimeo Player Settings
// @author       Łukasz
// @include      https://*.vimeo.com/*
// @include      https://vimeo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vimeo.com
// @grant        none
// ==/UserScript==

(() => {
    'use strict';
    var _modules = {
        'Checkbox.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Checkbox = void 0;
            const Component_1 = _require('Component.ts');
            class Checkbox extends Component_1.default {
                constructor(checked) {
                    super('input', {
                        styles: {
                            accentColor: 'var(--color-two)',
                            appearance: 'auto',
                            width: '16px',
                            height: '16px',
                            margin: '0',
                            padding: '0',
                        },
                        attrs: {
                            type: 'checkbox',
                            title: 'Remember speed',
                            checked: checked,
                        },
                    });
                }
                initEvents(onChange) {
                    this.event('change', () => onChange(this.element.checked));
                }
                setValue(checked) {
                    this.element.checked = checked;
                }
            }
            exports.Checkbox = Checkbox;
        },

        'Component.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            const Dom_1 = _require('Dom.ts');
            class Component {
                constructor(tag, props = {}) {
                    this.element = Dom_1.Dom.create({tag, ...props});
                }
                addClassName(...className) {
                    this.element.classList.add(...className);
                }
                event(event, callback) {
                    this.element.addEventListener(event, callback);
                }
                getElement() {
                    return this.element;
                }
                mount(parent) {
                    parent.appendChild(this.element);
                }
            }
            exports['default'] = Component;
        },

        'Dom.ts': (_unused_module, exports) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Dom = void 0;
            class Dom {
                static appendChildren(element, children) {
                    if (typeof children === 'string') {
                        element.innerHTML = children;
                    } else if (children) {
                        element.append(
                            ...Dom.array(children).map((item) => {
                                if (
                                    item instanceof HTMLElement ||
                                    item instanceof SVGElement
                                ) {
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
                static create(data) {
                    const element = document.createElement(data.tag);
                    Dom.appendChildren(element, data.children);
                    Dom.applyClass(element, data.classes);
                    Dom.applyAttrs(element, data.attrs);
                    Dom.applyEvents(element, data.events);
                    Dom.applyStyles(element, data.styles);
                    return element;
                }
                static element(tag, classes, children) {
                    return Dom.create({tag, classes, children});
                }
                static createSvg(data) {
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
                static array(element) {
                    return Array.isArray(element) ? element : [element];
                }
                static elementSvg(tag, classes, children) {
                    return Dom.createSvg({tag, classes, children});
                }
                static applyAttrs(element, attrs) {
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
                static applyStyles(element, styles) {
                    if (styles) {
                        Object.entries(styles).forEach(([key, value]) => {
                            const name = key.replace(
                                /[A-Z]/g,
                                (c) => `-${c.toLowerCase()}`,
                            );
                            element.style.setProperty(name, value);
                        });
                    }
                }
                static applyEvents(element, events) {
                    if (events) {
                        Object.entries(events).forEach(([name, callback]) => {
                            element.addEventListener(name, callback);
                        });
                    }
                }
                static applyClass(element, classes) {
                    if (classes) {
                        element.setAttribute('class', classes);
                    }
                }
                static isSvgItem(item) {
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
            exports.Dom = Dom;
        },

        'Elements.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Elements = void 0;
            const MenuItem_1 = _require('MenuItem.ts');
            class Elements {
                static ref(selector) {
                    return document.querySelector(selector);
                }
                static menu() {
                    return Elements.ref(
                        '[data-menu="prefs"] [class^=Menu_module_menuPanel]',
                    );
                }
                static menuItem() {
                    return Elements.ref(
                        '[data-menu="prefs"] [class^=Menu_module_menuPanel] [class^=MenuOption_module_option]',
                    );
                }
                static menuSpeedItem() {
                    const optionItems = [
                        ...document.querySelectorAll(
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
                            e.id !== MenuItem_1.MenuItem.ID &&
                            speedLabels.some((text) => e.innerText.includes(text)),
                    );
                }
                static menuSpeedLabel() {
                    var _a;
                    return (_a = Elements.menuSpeedItem()) === null || _a === void 0
                        ? void 0
                        : _a.querySelector('span');
                }
                static video() {
                    return Elements.ref('.vp-video video');
                }
            }
            exports.Elements = Elements;
        },

        'Label.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Label = void 0;
            const Component_1 = _require('Component.ts');
            const Elements_1 = _require('Elements.ts');
            class Label extends Component_1.default {
                constructor() {
                    super('span');
                    this.label = 'Speed';
                    this.speed = '1.0';
                }
                init() {
                    const originalItemLabel = Elements_1.Elements.menuSpeedLabel();
                    if (originalItemLabel) {
                        this.label = originalItemLabel.innerText;
                        this.element.className = originalItemLabel.className;
                        this.render();
                    }
                }
                setSpeed(speed) {
                    this.speed = speed.toFixed(1);
                    this.render();
                }
                render() {
                    this.element.innerText = `${this.label}: ${this.speed}`;
                }
            }
            exports.Label = Label;
        },

        'MenuItem.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.MenuItem = void 0;
            const Component_1 = _require('Component.ts');
            const Elements_1 = _require('Elements.ts');
            const Slider_1 = _require('Slider.ts');
            const Checkbox_1 = _require('Checkbox.ts');
            const Label_1 = _require('Label.ts');
            const Dom_1 = _require('Dom.ts');
            class MenuItem extends Component_1.default {
                constructor(setSpeed, setRemember) {
                    super('div', {attrs: {id: MenuItem.ID}});
                    this.checkbox = new Checkbox_1.Checkbox(false);
                    this.slider = new Slider_1.Slider();
                    this.label = new Label_1.Label();
                    this.wrapper = Dom_1.Dom.create({
                        tag: 'div',
                        styles: {
                            display: 'flex',
                            alignItems: 'center',
                        },
                    });
                    this.wrapper.append(
                        this.checkbox.getElement(),
                        this.slider.getElement(),
                    );
                    this.element.append(this.label.getElement(), this.wrapper);
                    this.slider.initEvents(setSpeed);
                    this.checkbox.initEvents(setRemember);
                }
                setSpeed(speed) {
                    this.slider.setSpeed(speed);
                    this.label.setSpeed(speed);
                }
                setRemember(state) {
                    this.checkbox.setValue(state);
                }
                mountItem() {
                    var _a, _b;
                    const originalSpeedItem = Elements_1.Elements.menuSpeedItem();
                    if (!originalSpeedItem) {
                        (_a = this.element.parentNode) === null || _a === void 0
                            ? void 0
                            : _a.removeChild(this.element);
                        return;
                    }
                    originalSpeedItem.style.setProperty('display', 'none');
                    if (!this.element.parentNode) {
                        originalSpeedItem.after(this.element);
                        this.label.init();
                        this.element.className =
                            ((_b = Elements_1.Elements.menuItem()) === null ||
                            _b === void 0
                                ? void 0
                                : _b.className) || this.element.className;
                    }
                }
            }
            exports.MenuItem = MenuItem;
            MenuItem.ID = 'vis-menu-speed-item';
        },

        'Player.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Player = void 0;
            const Elements_1 = _require('Elements.ts');
            class Player {
                constructor() {
                    this.player = null;
                    this.speed = 1;
                }
                getPlayer() {
                    if (!this.player) {
                        this.player = Elements_1.Elements.video();
                        if (this.player) {
                            this.initEvent(this.player);
                        }
                    }
                    return this.player;
                }
                initEvent(player) {
                    if (!player.getAttribute(Player.READY_FLAG)) {
                        player.addEventListener(
                            'ratechange',
                            this.checkPlayerSpeed.bind(this),
                        );
                        player.setAttribute(Player.READY_FLAG, 'ready');
                    }
                }
                checkPlayerSpeed() {
                    const player = this.getPlayer();
                    if (
                        player &&
                        Math.abs(player.playbackRate - this.speed) > 0.01
                    ) {
                        player.playbackRate = this.speed;
                        setTimeout(this.checkPlayerSpeed.bind(this), 200);
                    }
                }
                setSpeed(speed) {
                    this.speed = speed;
                    const player = this.getPlayer();
                    if (player !== null) {
                        player.playbackRate = speed;
                    }
                }
            }
            exports.Player = Player;
            Player.READY_FLAG = 'vis-listener';
        },

        'Slider.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Slider = void 0;
            const Component_1 = _require('Component.ts');
            class Slider extends Component_1.default {
                constructor() {
                    super('input', {
                        classes: 'vis-slider',
                        attrs: {
                            type: 'range',
                            min: Slider.MIN_VALUE,
                            max: Slider.MAX_VALUE,
                            step: 0.05,
                        },
                        styles: {
                            background: '#ffffff66',
                            width: 'calc(100% - 30px)',
                            height: '6px',
                            outline: 'none',
                            margin: '0 10px',
                            padding: '0',
                            borderRadius: '3px',
                        },
                    });
                }
                initEvents(onChange) {
                    this.event('change', () => onChange(this.getSpeed()));
                    this.event('input', () => onChange(this.getSpeed()));
                    this.event('wheel', (event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        const diff = event.deltaY > 0 ? -0.05 : 0.05;
                        onChange(this.getSpeed() + diff);
                        return false;
                    });
                }
                setSpeed(speed) {
                    this.element.value = speed.toString();
                }
                getSpeed() {
                    return parseFloat(this.element.value);
                }
            }
            exports.Slider = Slider;
            Slider.MIN_VALUE = 0.5;
            Slider.MAX_VALUE = 4;
        },

        'AppController.ts': (_unused_module, exports, _require) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.AppController = void 0;
            const Store_1 = _require('Store.ts');
            const MenuItem_1 = _require('MenuItem.ts');
            const Player_1 = _require('Player.ts');
            const Observer_1 = _require('Observer.ts');
            const Elements_1 = _require('Elements.ts');
            class AppController {
                constructor() {
                    this.player = new Player_1.Player();
                    this.videoObserver = new Observer_1.Observer();
                    this.menuObserver = new Observer_1.Observer();
                    this.rememberSpeed = new Store_1.Store('vis-remember-speed');
                    this.speed = new Store_1.Store('vis-speed');
                    this.item = new MenuItem_1.MenuItem(
                        this.setSpeed.bind(this),
                        this.setRemember.bind(this),
                    );
                    this.setSpeed(this.getSpeed());
                    this.setRemember(this.rememberSpeed.get(false));
                }
                setSpeed(speed) {
                    this.speed.set(speed);
                    this.player.setSpeed(speed);
                    this.item.setSpeed(speed);
                }
                setRemember(state) {
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
                    const video = Elements_1.Elements.video();
                    const menu = Elements_1.Elements.menu();
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
            exports.AppController = AppController;
        },

        'Observer.ts': (_unused_module, exports) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Observer = void 0;
            class Observer {
                stop() {
                    if (this.observer) {
                        this.observer.disconnect();
                    }
                }
                start(element, callback) {
                    this.stop();
                    this.observer = new MutationObserver(callback);
                    this.observer.observe(element, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        characterData: true,
                        attributeOldValue: true,
                        characterDataOldValue: true,
                    });
                }
            }
            exports.Observer = Observer;
        },

        'Store.ts': (_unused_module, exports) => {
            Object.defineProperty(exports, '__esModule', {value: true});
            exports.Store = void 0;
            class Store {
                constructor(key) {
                    this.key = key;
                }
                encode(val) {
                    return JSON.stringify(val);
                }
                decode(val) {
                    return JSON.parse(val);
                }
                set(value) {
                    try {
                        localStorage.setItem(this.key, this.encode(value));
                    } catch (e) {
                        return;
                    }
                }
                get(defaultValue = undefined) {
                    try {
                        const data = localStorage.getItem(this.key);
                        if (data) {
                            return this.decode(data);
                        }
                        return defaultValue;
                    } catch (e) {
                        return defaultValue;
                    }
                }
                remove() {
                    localStorage.removeItem(this.key);
                }
            }
            exports.Store = Store;
        },
    };

    var _module_cache = {};

    function _require(moduleId) {
        var cachedModule = _module_cache[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }

        var module = (_module_cache[moduleId] = {
            exports: {},
        });

        _modules[moduleId](module, module.exports, _require);

        return module.exports;
    }

    var _exports = {};

    (() => {
        var exports = _exports;
        var _unused_export;

        _unused_export = {value: true};
        const AppController_1 = _require('AppController.ts');
        const app = new AppController_1.AppController();
        let attempt = 0;
        function init() {
            if (attempt <= 4 && !app.init()) {
                attempt++;
                window.setTimeout(init, 2000);
            }
        }
        init();
    })();
})();
