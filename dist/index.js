
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Checkbox.ts":
/*!************************************!*\
  !*** ./src/components/Checkbox.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Checkbox = void 0;
const Component_1 = __webpack_require__(/*! ./Component */ "./src/components/Component.ts");
class Checkbox extends Component_1.default {
    constructor(checked) {
        super(document.createElement('input'));
        this.element.checked = checked;
        this.setParams({
            type: 'checkbox',
            title: 'Remember speed',
        });
        this.setStyle({
            'accent-color': 'var(--color-two)',
            appearance: 'auto',
            width: '16px',
            height: '16px',
            margin: '0',
            padding: '0',
        });
    }
    getValue() {
        return this.element.checked;
    }
    setValue(checked) {
        this.element.checked = checked;
    }
}
exports.Checkbox = Checkbox;


/***/ }),

/***/ "./src/components/Component.ts":
/*!*************************************!*\
  !*** ./src/components/Component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Component {
    constructor(element) {
        this.element = element;
    }
    addStyle(styles) {
        const id = 'vis-style';
        const style = document.getElementById(id) ||
            (function () {
                const style = document.createElement('style');
                style.id = id;
                document.head.appendChild(style);
                return style;
            })();
        style.innerHTML += styles;
    }
    setStyle(styles) {
        Object.entries(styles).forEach(([key, value]) => {
            this.element.style.setProperty(key, `${value}`);
        });
    }
    setParams(params) {
        Object.entries(params).forEach(([key, value]) => {
            let _value = `${value}`;
            if (value === undefined || value === false) {
                _value = '';
            }
            this.element.setAttribute(key, _value);
        });
    }
    setClassName(clasName) {
        this.element.className = clasName;
    }
    event(event, callback) {
        this.element.addEventListener(event, callback);
    }
    getElement() {
        return this.element;
    }
}
exports["default"] = Component;


/***/ }),

/***/ "./src/components/DockItem.ts":
/*!************************************!*\
  !*** ./src/components/DockItem.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DockItem = void 0;
const Component_1 = __webpack_require__(/*! ./Component */ "./src/components/Component.ts");
const Elements_1 = __webpack_require__(/*! ./Elements */ "./src/components/Elements.ts");
class DockItem extends Component_1.default {
    constructor(slider, checkbox) {
        super(document.createElement('div'));
        this.label = document.createElement('label');
        this.button = document.createElement('button');
        this.speedLabel = document.createElement('span');
        this.setParams({ id: DockItem.ID });
        this.initLabel();
        this.initButton();
        this.label.appendChild(checkbox);
        this.label.appendChild(slider);
        this.label.appendChild(this.speedLabel);
        this.event('mouseenter', () => this.label.style.removeProperty('display'));
        this.event('mouseleave', () => this.label.style.setProperty('display', 'none'));
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
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('fill', 'white');
        polygon.setAttribute('points', '2,1 2,19 11,10 11,19 20,10 11,1 11,10');
        return polygon;
    }
    initClassNames() {
        if (this.element.className !== '') {
            return;
        }
        const item = Elements_1.Elements.dockItem();
        if (item) {
            this.setClassName(item.className);
        }
        const dockButton = Elements_1.Elements.dockItemButton();
        if (dockButton) {
            this.button.className = dockButton.className;
            this.button.type = dockButton.type;
        }
        const dockLabel = Elements_1.Elements.dockItemLabel();
        if (dockLabel) {
            this.label.className = dockLabel.className;
            this.label.role = dockLabel.role;
        }
    }
    updateSpeed(speed) {
        this.speedLabel.innerText = speed.toFixed(1);
    }
    mount() {
        this.initClassNames();
        if (Elements_1.Elements.ref(`#${DockItem.ID}`)) {
            return true;
        }
        const dock = Elements_1.Elements.dock();
        if (dock) {
            dock.appendChild(this.element);
            return true;
        }
        return false;
    }
}
exports.DockItem = DockItem;
DockItem.ID = 'vis-dock-item';


/***/ }),

/***/ "./src/components/Elements.ts":
/*!************************************!*\
  !*** ./src/components/Elements.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Elements = void 0;
const MenuSpeedItem_1 = __webpack_require__(/*! ./MenuSpeedItem */ "./src/components/MenuSpeedItem.ts");
class Elements {
    static ref(selector) {
        return document.querySelector(selector);
    }
    static menu() {
        return Elements.ref('[data-menu="prefs"] [class^=Menu_module_menuPanel]');
    }
    static menuItem() {
        return Elements.ref('[data-menu="prefs"] [class^=Menu_module_menuPanel] [class^=MenuOption_module_option]');
    }
    static menuLabel() {
        var _a;
        return (_a = Elements.menuItem()) === null || _a === void 0 ? void 0 : _a.querySelector('span');
    }
    static menuSpeedItem() {
        return [
            ...document.querySelectorAll('[data-menu="prefs"] [class^=MenuOption_module_option]'),
        ].find((e) => /Speed/.test(e.innerText) && e.id !== MenuSpeedItem_1.MenuSpeedItem.ID);
    }
    static dock() {
        return Elements.ref('.vp-sidedock');
    }
    static dockItem() {
        return Elements.ref('.vp-sidedock>div');
    }
    static dockItemButton() {
        return Elements.ref('.vp-sidedock>div>button');
    }
    static dockItemLabel() {
        return Elements.ref('.vp-sidedock>div>label');
    }
    static video() {
        return Elements.ref('.vp-video video');
    }
}
exports.Elements = Elements;


/***/ }),

/***/ "./src/components/MenuSpeedItem.ts":
/*!*****************************************!*\
  !*** ./src/components/MenuSpeedItem.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuSpeedItem = void 0;
const Component_1 = __webpack_require__(/*! ./Component */ "./src/components/Component.ts");
const Elements_1 = __webpack_require__(/*! ./Elements */ "./src/components/Elements.ts");
class MenuSpeedItem extends Component_1.default {
    constructor(slider, checkbox) {
        super(document.createElement('div'));
        this.sliderWrapper = document.createElement('div');
        this.label = document.createElement('span');
        this.setParams({ id: MenuSpeedItem.ID });
        this.element.appendChild(this.label);
        this.sliderWrapper.appendChild(checkbox);
        this.sliderWrapper.appendChild(slider);
        this.element.appendChild(this.sliderWrapper);
        this.initWrapper();
    }
    initWrapper() {
        this.sliderWrapper.style.setProperty('display', 'flex');
        this.sliderWrapper.style.setProperty('align-items', 'center');
    }
    initClassNames() {
        if (this.element.className !== '') {
            return;
        }
        const menuItem = Elements_1.Elements.menuItem();
        if (menuItem) {
            this.setClassName(menuItem.className);
        }
        const menuLabel = Elements_1.Elements.menuLabel();
        if (menuLabel) {
            this.label.className = menuLabel.className;
        }
    }
    updateSpeed(speed) {
        this.label.innerText = `Speed: ${speed.toFixed(1)}`;
    }
    mount() {
        this.initClassNames();
        const defaultSpeedItem = Elements_1.Elements.menuSpeedItem();
        console.log(defaultSpeedItem);
        if (defaultSpeedItem) {
            defaultSpeedItem.style.setProperty('display', 'none');
        }
        if (Elements_1.Elements.ref(`#${MenuSpeedItem.ID}`)) {
            return true;
        }
        const menu = Elements_1.Elements.menu();
        if (menu) {
            menu.appendChild(this.element);
            return true;
        }
        return false;
    }
}
exports.MenuSpeedItem = MenuSpeedItem;
MenuSpeedItem.ID = 'vis-menu-speed-item';


/***/ }),

/***/ "./src/components/Player.ts":
/*!**********************************!*\
  !*** ./src/components/Player.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const Elements_1 = __webpack_require__(/*! ./Elements */ "./src/components/Elements.ts");
class Player {
    constructor(speed) {
        this.setSpeed(speed);
    }
    setSpeed(speed) {
        const video = Elements_1.Elements.video();
        if (video !== null) {
            video.playbackRate = speed;
        }
    }
}
exports.Player = Player;


/***/ }),

/***/ "./src/components/Slider.ts":
/*!**********************************!*\
  !*** ./src/components/Slider.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Slider = void 0;
const Component_1 = __webpack_require__(/*! ./Component */ "./src/components/Component.ts");
class Slider extends Component_1.default {
    constructor(speed) {
        super(document.createElement('input'));
        this.setParams({
            type: 'range',
            min: Slider.MIN,
            max: Slider.MAX,
            step: 0.05,
            value: speed.toString(),
        });
        this.setClassName('vis-slider');
        this.setStyle({
            background: '#ffffff66',
            width: 'calc(100% - 30px)',
            height: '6px',
            outline: 'none',
            margin: '0 10px',
            padding: '0',
            'border-radius': '3px',
        });
        this.addStyle(`
            .vis-slider {
              -webkit-appearance: none;
            }
            
            .vis-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: var(--color-two);
              cursor: pointer;
            }
            
            .vis-slider::-moz-range-thumb {
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: var(--color-two);
              cursor: pointer;
            }`);
    }
    setSpeed(speed) {
        this.element.value = speed.toString();
    }
    getSpeed() {
        return parseFloat(this.element.value);
    }
}
exports.Slider = Slider;
Slider.MIN = 0.5;
Slider.MAX = 4;


/***/ }),

/***/ "./src/controllers/AppController.ts":
/*!******************************************!*\
  !*** ./src/controllers/AppController.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const Slider_1 = __webpack_require__(/*! ../components/Slider */ "./src/components/Slider.ts");
const Checkbox_1 = __webpack_require__(/*! ../components/Checkbox */ "./src/components/Checkbox.ts");
const Store_1 = __webpack_require__(/*! ../data/Store */ "./src/data/Store.ts");
const MenuSpeedItem_1 = __webpack_require__(/*! ../components/MenuSpeedItem */ "./src/components/MenuSpeedItem.ts");
const Player_1 = __webpack_require__(/*! ../components/Player */ "./src/components/Player.ts");
const Observer_1 = __webpack_require__(/*! ./Observer */ "./src/controllers/Observer.ts");
const DockItem_1 = __webpack_require__(/*! ../components/DockItem */ "./src/components/DockItem.ts");
const Elements_1 = __webpack_require__(/*! ../components/Elements */ "./src/components/Elements.ts");
class AppController {
    constructor() {
        this.rememberSpeed = new Store_1.Store('vis-remember-speed');
        this.speed = new Store_1.Store('vis-speed');
        const initialSpeed = this.getSpeed();
        this.player = new Player_1.Player(initialSpeed);
        this.menuSlider = new Slider_1.Slider(initialSpeed);
        this.dockSlider = new Slider_1.Slider(initialSpeed);
        this.menuCheckbox = new Checkbox_1.Checkbox(this.rememberSpeed.get(false));
        this.dockCheckbox = new Checkbox_1.Checkbox(this.rememberSpeed.get(false));
        this.dockItem = new DockItem_1.DockItem(this.dockSlider.getElement(), this.dockCheckbox.getElement());
        this.menuSpeedItem = new MenuSpeedItem_1.MenuSpeedItem(this.menuSlider.getElement(), this.menuCheckbox.getElement());
        this.observer = new Observer_1.Observer();
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
    }
    sliderChangeEvent(e) {
        this.updateSpeed(parseFloat(e.target.value));
    }
    checkboxEvent(e) {
        const checked = e.target.checked;
        this.rememberSpeed.set(checked);
        this.dockCheckbox.setValue(checked);
        this.menuCheckbox.setValue(checked);
    }
    sliderWheelEvent(event) {
        const current = parseFloat(event.target.value);
        const diff = event.deltaY > 0 ? -0.05 : 0.05;
        const value = Math.max(Slider_1.Slider.MIN, Math.min(current + diff, Slider_1.Slider.MAX));
        if (current != value) {
            this.updateSpeed(value);
        }
        event.preventDefault();
    }
    updateSpeed(speed) {
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
        const video = Elements_1.Elements.video();
        if (video) {
            this.observer.start(video, this.mutationCallback.bind(this));
        }
        this.menuSpeedItem.mount();
        return this.dockItem.mount();
    }
}
exports.AppController = AppController;


/***/ }),

/***/ "./src/controllers/Observer.ts":
/*!*************************************!*\
  !*** ./src/controllers/Observer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/data/Store.ts":
/*!***************************!*\
  !*** ./src/data/Store.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
        }
        catch (e) {
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
        }
        catch (e) {
            return defaultValue;
        }
    }
    remove() {
        localStorage.removeItem(this.key);
    }
}
exports.Store = Store;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const AppController_1 = __webpack_require__(/*! ./controllers/AppController */ "./src/controllers/AppController.ts");
const app = new AppController_1.AppController();
function init() {
    if (!app.initApp()) {
        window.setTimeout(init, 2000);
    }
}
document.addEventListener('spfdone', init);
init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQkFBZ0I7QUFDaEIsb0JBQW9CLG1CQUFPLENBQUMsa0RBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7Ozs7Ozs7Ozs7QUM1Qkg7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE1BQU07QUFDekQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixNQUFNO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUN6Q0Y7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCLG9CQUFvQixtQkFBTyxDQUFDLGtEQUFhO0FBQ3pDLG1CQUFtQixtQkFBTyxDQUFDLGdEQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFlBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7Ozs7Ozs7Ozs7O0FDOUVhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdCQUFnQjtBQUNoQix3QkFBd0IsbUJBQU8sQ0FBQywwREFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7Ozs7Ozs7Ozs7QUN2Q0g7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCLG9CQUFvQixtQkFBTyxDQUFDLGtEQUFhO0FBQ3pDLG1CQUFtQixtQkFBTyxDQUFDLGdEQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0JBQXNCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxpQkFBaUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpQkFBaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7Ozs7Ozs7Ozs7O0FDeERhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWM7QUFDZCxtQkFBbUIsbUJBQU8sQ0FBQyxnREFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7QUNmRDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjO0FBQ2Qsb0JBQW9CLG1CQUFPLENBQUMsa0RBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOzs7Ozs7Ozs7OztBQ3hEYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckIsaUJBQWlCLG1CQUFPLENBQUMsd0RBQXNCO0FBQy9DLG1CQUFtQixtQkFBTyxDQUFDLDREQUF3QjtBQUNuRCxnQkFBZ0IsbUJBQU8sQ0FBQywwQ0FBZTtBQUN2Qyx3QkFBd0IsbUJBQU8sQ0FBQyxzRUFBNkI7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsd0RBQXNCO0FBQy9DLG1CQUFtQixtQkFBTyxDQUFDLGlEQUFZO0FBQ3ZDLG1CQUFtQixtQkFBTyxDQUFDLDREQUF3QjtBQUNuRCxtQkFBbUIsbUJBQU8sQ0FBQyw0REFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7Ozs7Ozs7Ozs7QUMvRVI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQkFBZ0I7Ozs7Ozs7Ozs7O0FDdEJIO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7Ozs7Ozs7VUNyQ2I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyx1RUFBNkI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29uLWhvdmVyLXByZXZpZXcvLi9zcmMvY29tcG9uZW50cy9DaGVja2JveC50cyIsIndlYnBhY2s6Ly9vbi1ob3Zlci1wcmV2aWV3Ly4vc3JjL2NvbXBvbmVudHMvQ29tcG9uZW50LnRzIiwid2VicGFjazovL29uLWhvdmVyLXByZXZpZXcvLi9zcmMvY29tcG9uZW50cy9Eb2NrSXRlbS50cyIsIndlYnBhY2s6Ly9vbi1ob3Zlci1wcmV2aWV3Ly4vc3JjL2NvbXBvbmVudHMvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vb24taG92ZXItcHJldmlldy8uL3NyYy9jb21wb25lbnRzL01lbnVTcGVlZEl0ZW0udHMiLCJ3ZWJwYWNrOi8vb24taG92ZXItcHJldmlldy8uL3NyYy9jb21wb25lbnRzL1BsYXllci50cyIsIndlYnBhY2s6Ly9vbi1ob3Zlci1wcmV2aWV3Ly4vc3JjL2NvbXBvbmVudHMvU2xpZGVyLnRzIiwid2VicGFjazovL29uLWhvdmVyLXByZXZpZXcvLi9zcmMvY29udHJvbGxlcnMvQXBwQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9vbi1ob3Zlci1wcmV2aWV3Ly4vc3JjL2NvbnRyb2xsZXJzL09ic2VydmVyLnRzIiwid2VicGFjazovL29uLWhvdmVyLXByZXZpZXcvLi9zcmMvZGF0YS9TdG9yZS50cyIsIndlYnBhY2s6Ly9vbi1ob3Zlci1wcmV2aWV3L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29uLWhvdmVyLXByZXZpZXcvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNoZWNrYm94ID0gdm9pZCAwO1xuY29uc3QgQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRcIik7XG5jbGFzcyBDaGVja2JveCBleHRlbmRzIENvbXBvbmVudF8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKGNoZWNrZWQpIHtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbXMoe1xuICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgIHRpdGxlOiAnUmVtZW1iZXIgc3BlZWQnLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZSh7XG4gICAgICAgICAgICAnYWNjZW50LWNvbG9yJzogJ3ZhcigtLWNvbG9yLXR3byknLFxuICAgICAgICAgICAgYXBwZWFyYW5jZTogJ2F1dG8nLFxuICAgICAgICAgICAgd2lkdGg6ICcxNnB4JyxcbiAgICAgICAgICAgIGhlaWdodDogJzE2cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jaGVja2VkO1xuICAgIH1cbiAgICBzZXRWYWx1ZShjaGVja2VkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jaGVja2VkID0gY2hlY2tlZDtcbiAgICB9XG59XG5leHBvcnRzLkNoZWNrYm94ID0gQ2hlY2tib3g7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cbiAgICBhZGRTdHlsZShzdHlsZXMpIHtcbiAgICAgICAgY29uc3QgaWQgPSAndmlzLXN0eWxlJztcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgfHxcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHN0eWxlLmlkID0gaWQ7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9IHN0eWxlcztcbiAgICB9XG4gICAgc2V0U3R5bGUoc3R5bGVzKSB7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHN0eWxlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCBgJHt2YWx1ZX1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFBhcmFtcyhwYXJhbXMpIHtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMocGFyYW1zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGxldCBfdmFsdWUgPSBgJHt2YWx1ZX1gO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgX3ZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgX3ZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldENsYXNzTmFtZShjbGFzTmFtZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc05hbWU7XG4gICAgfVxuICAgIGV2ZW50KGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Eb2NrSXRlbSA9IHZvaWQgMDtcbmNvbnN0IENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50XCIpO1xuY29uc3QgRWxlbWVudHNfMSA9IHJlcXVpcmUoXCIuL0VsZW1lbnRzXCIpO1xuY2xhc3MgRG9ja0l0ZW0gZXh0ZW5kcyBDb21wb25lbnRfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIsIGNoZWNrYm94KSB7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuc3BlZWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbXMoeyBpZDogRG9ja0l0ZW0uSUQgfSk7XG4gICAgICAgIHRoaXMuaW5pdExhYmVsKCk7XG4gICAgICAgIHRoaXMuaW5pdEJ1dHRvbigpO1xuICAgICAgICB0aGlzLmxhYmVsLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgICAgdGhpcy5sYWJlbC5hcHBlbmRDaGlsZChzbGlkZXIpO1xuICAgICAgICB0aGlzLmxhYmVsLmFwcGVuZENoaWxkKHRoaXMuc3BlZWRMYWJlbCk7XG4gICAgICAgIHRoaXMuZXZlbnQoJ21vdXNlZW50ZXInLCAoKSA9PiB0aGlzLmxhYmVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5JykpO1xuICAgICAgICB0aGlzLmV2ZW50KCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5sYWJlbC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJykpO1xuICAgIH1cbiAgICBpbml0TGFiZWwoKSB7XG4gICAgICAgIHRoaXMubGFiZWwuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sYWJlbCk7XG4gICAgfVxuICAgIGluaXRCdXR0b24oKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFwcGVuZENoaWxkKHRoaXMuZ2V0U3ZnKCkpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5idXR0b24pO1xuICAgIH1cbiAgICBnZXRTdmcoKSB7XG4gICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcyMCcpO1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyMCcpO1xuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAyMCAyMCcpO1xuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQodGhpcy5nZXRQb2x5Z29uKCkpO1xuICAgICAgICByZXR1cm4gc3ZnO1xuICAgIH1cbiAgICBnZXRQb2x5Z29uKCkge1xuICAgICAgICBjb25zdCBwb2x5Z29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdwb2x5Z29uJyk7XG4gICAgICAgIHBvbHlnb24uc2V0QXR0cmlidXRlKCdmaWxsJywgJ3doaXRlJyk7XG4gICAgICAgIHBvbHlnb24uc2V0QXR0cmlidXRlKCdwb2ludHMnLCAnMiwxIDIsMTkgMTEsMTAgMTEsMTkgMjAsMTAgMTEsMSAxMSwxMCcpO1xuICAgICAgICByZXR1cm4gcG9seWdvbjtcbiAgICB9XG4gICAgaW5pdENsYXNzTmFtZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NOYW1lICE9PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBFbGVtZW50c18xLkVsZW1lbnRzLmRvY2tJdGVtKCk7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNldENsYXNzTmFtZShpdGVtLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZG9ja0J1dHRvbiA9IEVsZW1lbnRzXzEuRWxlbWVudHMuZG9ja0l0ZW1CdXR0b24oKTtcbiAgICAgICAgaWYgKGRvY2tCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmNsYXNzTmFtZSA9IGRvY2tCdXR0b24uY2xhc3NOYW1lO1xuICAgICAgICAgICAgdGhpcy5idXR0b24udHlwZSA9IGRvY2tCdXR0b24udHlwZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkb2NrTGFiZWwgPSBFbGVtZW50c18xLkVsZW1lbnRzLmRvY2tJdGVtTGFiZWwoKTtcbiAgICAgICAgaWYgKGRvY2tMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbC5jbGFzc05hbWUgPSBkb2NrTGFiZWwuY2xhc3NOYW1lO1xuICAgICAgICAgICAgdGhpcy5sYWJlbC5yb2xlID0gZG9ja0xhYmVsLnJvbGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlU3BlZWQoc3BlZWQpIHtcbiAgICAgICAgdGhpcy5zcGVlZExhYmVsLmlubmVyVGV4dCA9IHNwZWVkLnRvRml4ZWQoMSk7XG4gICAgfVxuICAgIG1vdW50KCkge1xuICAgICAgICB0aGlzLmluaXRDbGFzc05hbWVzKCk7XG4gICAgICAgIGlmIChFbGVtZW50c18xLkVsZW1lbnRzLnJlZihgIyR7RG9ja0l0ZW0uSUR9YCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRvY2sgPSBFbGVtZW50c18xLkVsZW1lbnRzLmRvY2soKTtcbiAgICAgICAgaWYgKGRvY2spIHtcbiAgICAgICAgICAgIGRvY2suYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnRzLkRvY2tJdGVtID0gRG9ja0l0ZW07XG5Eb2NrSXRlbS5JRCA9ICd2aXMtZG9jay1pdGVtJztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FbGVtZW50cyA9IHZvaWQgMDtcbmNvbnN0IE1lbnVTcGVlZEl0ZW1fMSA9IHJlcXVpcmUoXCIuL01lbnVTcGVlZEl0ZW1cIik7XG5jbGFzcyBFbGVtZW50cyB7XG4gICAgc3RhdGljIHJlZihzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuICAgIHN0YXRpYyBtZW51KCkge1xuICAgICAgICByZXR1cm4gRWxlbWVudHMucmVmKCdbZGF0YS1tZW51PVwicHJlZnNcIl0gW2NsYXNzXj1NZW51X21vZHVsZV9tZW51UGFuZWxdJyk7XG4gICAgfVxuICAgIHN0YXRpYyBtZW51SXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIEVsZW1lbnRzLnJlZignW2RhdGEtbWVudT1cInByZWZzXCJdIFtjbGFzc149TWVudV9tb2R1bGVfbWVudVBhbmVsXSBbY2xhc3NePU1lbnVPcHRpb25fbW9kdWxlX29wdGlvbl0nKTtcbiAgICB9XG4gICAgc3RhdGljIG1lbnVMYWJlbCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gRWxlbWVudHMubWVudUl0ZW0oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICB9XG4gICAgc3RhdGljIG1lbnVTcGVlZEl0ZW0oKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tZW51PVwicHJlZnNcIl0gW2NsYXNzXj1NZW51T3B0aW9uX21vZHVsZV9vcHRpb25dJyksXG4gICAgICAgIF0uZmluZCgoZSkgPT4gL1NwZWVkLy50ZXN0KGUuaW5uZXJUZXh0KSAmJiBlLmlkICE9PSBNZW51U3BlZWRJdGVtXzEuTWVudVNwZWVkSXRlbS5JRCk7XG4gICAgfVxuICAgIHN0YXRpYyBkb2NrKCkge1xuICAgICAgICByZXR1cm4gRWxlbWVudHMucmVmKCcudnAtc2lkZWRvY2snKTtcbiAgICB9XG4gICAgc3RhdGljIGRvY2tJdGVtKCkge1xuICAgICAgICByZXR1cm4gRWxlbWVudHMucmVmKCcudnAtc2lkZWRvY2s+ZGl2Jyk7XG4gICAgfVxuICAgIHN0YXRpYyBkb2NrSXRlbUJ1dHRvbigpIHtcbiAgICAgICAgcmV0dXJuIEVsZW1lbnRzLnJlZignLnZwLXNpZGVkb2NrPmRpdj5idXR0b24nKTtcbiAgICB9XG4gICAgc3RhdGljIGRvY2tJdGVtTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiBFbGVtZW50cy5yZWYoJy52cC1zaWRlZG9jaz5kaXY+bGFiZWwnKTtcbiAgICB9XG4gICAgc3RhdGljIHZpZGVvKCkge1xuICAgICAgICByZXR1cm4gRWxlbWVudHMucmVmKCcudnAtdmlkZW8gdmlkZW8nKTtcbiAgICB9XG59XG5leHBvcnRzLkVsZW1lbnRzID0gRWxlbWVudHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWVudVNwZWVkSXRlbSA9IHZvaWQgMDtcbmNvbnN0IENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50XCIpO1xuY29uc3QgRWxlbWVudHNfMSA9IHJlcXVpcmUoXCIuL0VsZW1lbnRzXCIpO1xuY2xhc3MgTWVudVNwZWVkSXRlbSBleHRlbmRzIENvbXBvbmVudF8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlciwgY2hlY2tib3gpIHtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbXMoeyBpZDogTWVudVNwZWVkSXRlbS5JRCB9KTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoc2xpZGVyKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2xpZGVyV3JhcHBlcik7XG4gICAgICAgIHRoaXMuaW5pdFdyYXBwZXIoKTtcbiAgICB9XG4gICAgaW5pdFdyYXBwZXIoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyV3JhcHBlci5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdmbGV4Jyk7XG4gICAgICAgIHRoaXMuc2xpZGVyV3JhcHBlci5zdHlsZS5zZXRQcm9wZXJ0eSgnYWxpZ24taXRlbXMnLCAnY2VudGVyJyk7XG4gICAgfVxuICAgIGluaXRDbGFzc05hbWVzKCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmNsYXNzTmFtZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtZW51SXRlbSA9IEVsZW1lbnRzXzEuRWxlbWVudHMubWVudUl0ZW0oKTtcbiAgICAgICAgaWYgKG1lbnVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNldENsYXNzTmFtZShtZW51SXRlbS5jbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1lbnVMYWJlbCA9IEVsZW1lbnRzXzEuRWxlbWVudHMubWVudUxhYmVsKCk7XG4gICAgICAgIGlmIChtZW51TGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwuY2xhc3NOYW1lID0gbWVudUxhYmVsLmNsYXNzTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVTcGVlZChzcGVlZCkge1xuICAgICAgICB0aGlzLmxhYmVsLmlubmVyVGV4dCA9IGBTcGVlZDogJHtzcGVlZC50b0ZpeGVkKDEpfWA7XG4gICAgfVxuICAgIG1vdW50KCkge1xuICAgICAgICB0aGlzLmluaXRDbGFzc05hbWVzKCk7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRTcGVlZEl0ZW0gPSBFbGVtZW50c18xLkVsZW1lbnRzLm1lbnVTcGVlZEl0ZW0oKTtcbiAgICAgICAgY29uc29sZS5sb2coZGVmYXVsdFNwZWVkSXRlbSk7XG4gICAgICAgIGlmIChkZWZhdWx0U3BlZWRJdGVtKSB7XG4gICAgICAgICAgICBkZWZhdWx0U3BlZWRJdGVtLnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoRWxlbWVudHNfMS5FbGVtZW50cy5yZWYoYCMke01lbnVTcGVlZEl0ZW0uSUR9YCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1lbnUgPSBFbGVtZW50c18xLkVsZW1lbnRzLm1lbnUoKTtcbiAgICAgICAgaWYgKG1lbnUpIHtcbiAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnRzLk1lbnVTcGVlZEl0ZW0gPSBNZW51U3BlZWRJdGVtO1xuTWVudVNwZWVkSXRlbS5JRCA9ICd2aXMtbWVudS1zcGVlZC1pdGVtJztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QbGF5ZXIgPSB2b2lkIDA7XG5jb25zdCBFbGVtZW50c18xID0gcmVxdWlyZShcIi4vRWxlbWVudHNcIik7XG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKHNwZWVkKSB7XG4gICAgICAgIHRoaXMuc2V0U3BlZWQoc3BlZWQpO1xuICAgIH1cbiAgICBzZXRTcGVlZChzcGVlZCkge1xuICAgICAgICBjb25zdCB2aWRlbyA9IEVsZW1lbnRzXzEuRWxlbWVudHMudmlkZW8oKTtcbiAgICAgICAgaWYgKHZpZGVvICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2aWRlby5wbGF5YmFja1JhdGUgPSBzcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuUGxheWVyID0gUGxheWVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNsaWRlciA9IHZvaWQgMDtcbmNvbnN0IENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50XCIpO1xuY2xhc3MgU2xpZGVyIGV4dGVuZHMgQ29tcG9uZW50XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Ioc3BlZWQpIHtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1zKHtcbiAgICAgICAgICAgIHR5cGU6ICdyYW5nZScsXG4gICAgICAgICAgICBtaW46IFNsaWRlci5NSU4sXG4gICAgICAgICAgICBtYXg6IFNsaWRlci5NQVgsXG4gICAgICAgICAgICBzdGVwOiAwLjA1LFxuICAgICAgICAgICAgdmFsdWU6IHNwZWVkLnRvU3RyaW5nKCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldENsYXNzTmFtZSgndmlzLXNsaWRlcicpO1xuICAgICAgICB0aGlzLnNldFN0eWxlKHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmZmZmNjYnLFxuICAgICAgICAgICAgd2lkdGg6ICdjYWxjKDEwMCUgLSAzMHB4KScsXG4gICAgICAgICAgICBoZWlnaHQ6ICc2cHgnLFxuICAgICAgICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMCAxMHB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzNweCcsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZFN0eWxlKGBcbiAgICAgICAgICAgIC52aXMtc2xpZGVyIHtcbiAgICAgICAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAudmlzLXNsaWRlcjo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgICAgICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItdHdvKTtcbiAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAudmlzLXNsaWRlcjo6LW1vei1yYW5nZS10aHVtYiB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItdHdvKTtcbiAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgfWApO1xuICAgIH1cbiAgICBzZXRTcGVlZChzcGVlZCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBzcGVlZC50b1N0cmluZygpO1xuICAgIH1cbiAgICBnZXRTcGVlZCgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5lbGVtZW50LnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLlNsaWRlciA9IFNsaWRlcjtcblNsaWRlci5NSU4gPSAwLjU7XG5TbGlkZXIuTUFYID0gNDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcHBDb250cm9sbGVyID0gdm9pZCAwO1xuY29uc3QgU2xpZGVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9TbGlkZXJcIik7XG5jb25zdCBDaGVja2JveF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvQ2hlY2tib3hcIik7XG5jb25zdCBTdG9yZV8xID0gcmVxdWlyZShcIi4uL2RhdGEvU3RvcmVcIik7XG5jb25zdCBNZW51U3BlZWRJdGVtXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9NZW51U3BlZWRJdGVtXCIpO1xuY29uc3QgUGxheWVyXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9QbGF5ZXJcIik7XG5jb25zdCBPYnNlcnZlcl8xID0gcmVxdWlyZShcIi4vT2JzZXJ2ZXJcIik7XG5jb25zdCBEb2NrSXRlbV8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvRG9ja0l0ZW1cIik7XG5jb25zdCBFbGVtZW50c18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvRWxlbWVudHNcIik7XG5jbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZW1lbWJlclNwZWVkID0gbmV3IFN0b3JlXzEuU3RvcmUoJ3Zpcy1yZW1lbWJlci1zcGVlZCcpO1xuICAgICAgICB0aGlzLnNwZWVkID0gbmV3IFN0b3JlXzEuU3RvcmUoJ3Zpcy1zcGVlZCcpO1xuICAgICAgICBjb25zdCBpbml0aWFsU3BlZWQgPSB0aGlzLmdldFNwZWVkKCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcl8xLlBsYXllcihpbml0aWFsU3BlZWQpO1xuICAgICAgICB0aGlzLm1lbnVTbGlkZXIgPSBuZXcgU2xpZGVyXzEuU2xpZGVyKGluaXRpYWxTcGVlZCk7XG4gICAgICAgIHRoaXMuZG9ja1NsaWRlciA9IG5ldyBTbGlkZXJfMS5TbGlkZXIoaW5pdGlhbFNwZWVkKTtcbiAgICAgICAgdGhpcy5tZW51Q2hlY2tib3ggPSBuZXcgQ2hlY2tib3hfMS5DaGVja2JveCh0aGlzLnJlbWVtYmVyU3BlZWQuZ2V0KGZhbHNlKSk7XG4gICAgICAgIHRoaXMuZG9ja0NoZWNrYm94ID0gbmV3IENoZWNrYm94XzEuQ2hlY2tib3godGhpcy5yZW1lbWJlclNwZWVkLmdldChmYWxzZSkpO1xuICAgICAgICB0aGlzLmRvY2tJdGVtID0gbmV3IERvY2tJdGVtXzEuRG9ja0l0ZW0odGhpcy5kb2NrU2xpZGVyLmdldEVsZW1lbnQoKSwgdGhpcy5kb2NrQ2hlY2tib3guZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgdGhpcy5tZW51U3BlZWRJdGVtID0gbmV3IE1lbnVTcGVlZEl0ZW1fMS5NZW51U3BlZWRJdGVtKHRoaXMubWVudVNsaWRlci5nZXRFbGVtZW50KCksIHRoaXMubWVudUNoZWNrYm94LmdldEVsZW1lbnQoKSk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXJfMS5PYnNlcnZlcigpO1xuICAgICAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVTcGVlZChpbml0aWFsU3BlZWQpO1xuICAgIH1cbiAgICBpbml0RXZlbnRzKCkge1xuICAgICAgICB0aGlzLmRvY2tTbGlkZXIuZXZlbnQoJ2NoYW5nZScsIHRoaXMuc2xpZGVyQ2hhbmdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubWVudVNsaWRlci5ldmVudCgnY2hhbmdlJywgdGhpcy5zbGlkZXJDaGFuZ2VFdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kb2NrU2xpZGVyLmV2ZW50KCdpbnB1dCcsIHRoaXMuc2xpZGVyQ2hhbmdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubWVudVNsaWRlci5ldmVudCgnaW5wdXQnLCB0aGlzLnNsaWRlckNoYW5nZUV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRvY2tTbGlkZXIuZXZlbnQoJ3doZWVsJywgdGhpcy5zbGlkZXJXaGVlbEV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm1lbnVTbGlkZXIuZXZlbnQoJ3doZWVsJywgdGhpcy5zbGlkZXJXaGVlbEV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRvY2tDaGVja2JveC5ldmVudCgnY2hhbmdlJywgdGhpcy5jaGVja2JveEV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm1lbnVDaGVja2JveC5ldmVudCgnY2hhbmdlJywgdGhpcy5jaGVja2JveEV2ZW50LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBzbGlkZXJDaGFuZ2VFdmVudChlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3BlZWQocGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkpO1xuICAgIH1cbiAgICBjaGVja2JveEV2ZW50KGUpIHtcbiAgICAgICAgY29uc3QgY2hlY2tlZCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIHRoaXMucmVtZW1iZXJTcGVlZC5zZXQoY2hlY2tlZCk7XG4gICAgICAgIHRoaXMuZG9ja0NoZWNrYm94LnNldFZhbHVlKGNoZWNrZWQpO1xuICAgICAgICB0aGlzLm1lbnVDaGVja2JveC5zZXRWYWx1ZShjaGVja2VkKTtcbiAgICB9XG4gICAgc2xpZGVyV2hlZWxFdmVudChldmVudCkge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gcGFyc2VGbG9hdChldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICBjb25zdCBkaWZmID0gZXZlbnQuZGVsdGFZID4gMCA/IC0wLjA1IDogMC4wNTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBNYXRoLm1heChTbGlkZXJfMS5TbGlkZXIuTUlOLCBNYXRoLm1pbihjdXJyZW50ICsgZGlmZiwgU2xpZGVyXzEuU2xpZGVyLk1BWCkpO1xuICAgICAgICBpZiAoY3VycmVudCAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTcGVlZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgdXBkYXRlU3BlZWQoc3BlZWQpIHtcbiAgICAgICAgdGhpcy5zcGVlZC5zZXQoc3BlZWQpO1xuICAgICAgICB0aGlzLnBsYXllci5zZXRTcGVlZChzcGVlZCk7XG4gICAgICAgIHRoaXMubWVudVNwZWVkSXRlbS51cGRhdGVTcGVlZChzcGVlZCk7XG4gICAgICAgIHRoaXMuZG9ja0l0ZW0udXBkYXRlU3BlZWQoc3BlZWQpO1xuICAgICAgICB0aGlzLmRvY2tTbGlkZXIuc2V0U3BlZWQoc3BlZWQpO1xuICAgICAgICB0aGlzLm1lbnVTbGlkZXIuc2V0U3BlZWQoc3BlZWQpO1xuICAgIH1cbiAgICBnZXRTcGVlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtZW1iZXJTcGVlZC5nZXQoZmFsc2UpID8gdGhpcy5zcGVlZC5nZXQoMSkgOiAxO1xuICAgIH1cbiAgICBtdXRhdGlvbkNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmluaXRBcHAoKTtcbiAgICB9XG4gICAgaW5pdEFwcCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3BlZWQodGhpcy5nZXRTcGVlZCgpKTtcbiAgICAgICAgY29uc3QgdmlkZW8gPSBFbGVtZW50c18xLkVsZW1lbnRzLnZpZGVvKCk7XG4gICAgICAgIGlmICh2aWRlbykge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlci5zdGFydCh2aWRlbywgdGhpcy5tdXRhdGlvbkNhbGxiYWNrLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWVudVNwZWVkSXRlbS5tb3VudCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb2NrSXRlbS5tb3VudCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXBwQ29udHJvbGxlciA9IEFwcENvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT2JzZXJ2ZXIgPSB2b2lkIDA7XG5jbGFzcyBPYnNlcnZlciB7XG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0KGVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2ZXIgPSBPYnNlcnZlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TdG9yZSA9IHZvaWQgMDtcbmNsYXNzIFN0b3JlIHtcbiAgICBjb25zdHJ1Y3RvcihrZXkpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIGVuY29kZSh2YWwpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgfVxuICAgIGRlY29kZSh2YWwpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsKTtcbiAgICB9XG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgdGhpcy5lbmNvZGUodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldChkZWZhdWx0VmFsdWUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSk7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmtleSk7XG4gICAgfVxufVxuZXhwb3J0cy5TdG9yZSA9IFN0b3JlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXBwQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvQXBwQ29udHJvbGxlclwiKTtcbmNvbnN0IGFwcCA9IG5ldyBBcHBDb250cm9sbGVyXzEuQXBwQ29udHJvbGxlcigpO1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpZiAoIWFwcC5pbml0QXBwKCkpIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoaW5pdCwgMjAwMCk7XG4gICAgfVxufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3BmZG9uZScsIGluaXQpO1xuaW5pdCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9