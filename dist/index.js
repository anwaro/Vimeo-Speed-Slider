// ==UserScript==
// @name         Vimeo Speed Slider
// @version      0.1.2
// @namespace    http://lukaszmical.pl/
// @description  Vimeo PLayer Speed Slider
// @author       Łukasz
// @include      https://*.vimeo.com/*
// @include      https://vimeo.com/*
// @exclude      https://player.vimeo.com/static/proxy.html
// @grant        none
// ==/UserScript==

var vi = {};
vi.el ={};


vi.init = function () {
    vi.el.menu = vi.$('.sidedock');
    if(vi.el.menu){
        vi.el.player = vi.$('video');
        vi.menu();
    }
    else {
        setTimeout(vi.init, 1000);
    }
};

vi.menu = function () {
    var box = vi.$.new('div', {
        className: 'box',
        onmouseover: function(event){
            event.currentTarget.firstChild.classList.remove('invisible');
            event.currentTarget.firstChild.classList.remove('hidden');
            event.currentTarget.firstChild.classList.add('visible');
        },
        onmouseout: function(event){
            event.currentTarget.firstChild.classList.add('invisible');
            event.currentTarget.firstChild.classList.add('hidden');
            event.currentTarget.firstChild.classList.remove('visible');
        },
        style:{
            'transition-delay': '.1s'
        }
    });
    var label = vi.$.new('label', {
        className: 'rounded-box speed-label invisible hidden',
        role: 'presentation'
    });
    var svg = vi.$.new('svg', {
        className: 'speed-icon',
        attr: {
            viewBox: '0 0 20 20',
            preserveAspectRatio: 'xMidYMid',
            tabindex: '-1'
        },
        style:{
            width: '2em',
            height: '2em'
        }
    });

    var buttonInner =
        '<svg class="speed-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid" tabindex="-1">' +
        '<polygon class="fill" points="5,5 5,15 10,10 10,15 15,10 10,5 10,10"></polygon>' +
        '</svg>';

    var button = vi.$.new('button', {
        className: 'speed-button rounded-box',
        'aria-label': 'Speed',
        innerHTML: buttonInner
    });

    var initSpeed = vi.initSpeed();

    label.appendChild(vi.check(vi.data('vi_r')));
    label.appendChild(vi.slider(initSpeed));
    label.appendChild(vi.label(initSpeed));
    box.appendChild(label);
    box.appendChild(button);
    vi.el.menu.appendChild(box);
    vi.duration(initSpeed);
};


vi.initSpeed = function () {
    if(vi.data('vi_r') && vi.data('vi_s')){
        return vi.data('vi_s');
    }
    return 1;
};

vi.check = function (isCheck) {
    var check = vi.$.new('input', {
        'type': 'checkbox',
        title: 'Remember Speed',
        style:{
            height: '20px',
            margin: '8px 8px 0 0',
            width: '20px',
            '-webkit-appearance': 'checkbox',
            '-moz-appearance': 'checkbox',
            'appearance': 'checkbox'
        },
        onchange: vi.remember
    });
    if(isCheck){
        vi.$.attr(check, 'checked', 'checked');
    }
    return check;

};
vi.label = function (initSpeed) {
    vi.el.label =  vi.$.new('div', {
        style:{
            height: '30px',
            width: '30px',
            float: 'right',
            'text-align': 'center',
            'margin-left': '5px',
            'font-size': '14px'
        }
    });
    return vi.el.label;
};

vi.slider = function (initSpeed) {
    return vi.$.new('input', {
        'type': 'range',
        'min': 0.5,
        'max': 4,
        'step': 0.1,
        'value': initSpeed,
        style:{
            'width': '100px',
            '-webkit-appearance': 'slider-horizontal',
            '-moz-appearance': 'slider-horizontal',
            'appearance': 'slider-horizontal'
        },
        onchange : vi.change,
        oninput: vi.move,
        onwheel: vi.onwheel
    });
};


vi.move = function (event) {
    vi.updateLabel(event.target.value);
};

vi.onwheel = function (event) {
    var val = parseFloat(event.target.value) + (event.wheelDelta > 0 ? 0.1 : -0.1);
    val = val < 0.5 ? 0.5 : (val > 4 ? 4 : val);
    if(event.target.value !== val){
        event.target.value = val;
        vi.duration(val);
    }
    return false;
};

vi.remember = function (event) {
    vi.data('vi_r', event.target.checked ? 1 :0);
};

vi.change = function (event) {
    vi.duration(event.target.value);
};


vi.duration = function(value){
    vi.updateLabel(value);
    vi.data('vi_s', value);
    vi.el.player.playbackRate = value;
};

vi.updateLabel = function(value){
    vi.el.label.innerHTML = parseFloat(value).toFixed(1);
};

vi.$ = function (tselector, all) {
    all = all || false;
    var type = tselector.substring(0, 1);
    var selector = tselector.substring(1);
    var elements;
    if (type === "#")return document.getElementById(selector);
    else if (type === ".") elements = document.getElementsByClassName(selector);
    else elements = document.querySelectorAll(tselector);
    if (all) return elements;
    else return elements.length ? elements[0] : null;
};

vi.$.new = function (tag, option) {
    var element = document.createElement(tag);
    for (var param in option) {
        if(param === 'data' || param === 'style'|| param === 'attr'){
            for(var data in option[param]){
                vi.$[param](element, data, option[param][data]);
            }
        }
        else{
            element[param] = option[param];
        }
    }
    return element;
};


vi.$.data = function (elem, key, val) {
    key = key.replace(/-(\w)/gi, function(x){return x.charAt(1).toUpperCase()});
    if(typeof val !== 'undefined'){
        elem.dataset[key] = val;
    }
    return elem.dataset[key];
};

vi.$.style = function (elem, key, val, priority) {
    priority = priority || '';
    if(typeof val !== 'undefined'){
        elem.style.setProperty(key, val, priority);
    }
    return elem.style.getPropertyValue(key);
};

vi.$.attr = function (elem, key, val) {
    if(typeof val !== 'undefined'){
        elem.setAttribute(key, val);
    }
    return elem.getAttribute(key);
};


vi.data = function (key, val) {
    if(typeof val !== 'undefined'){
        localStorage.setItem(key, val);
    }
    return localStorage.getItem(key);
};


(function(history, vi){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate === "function") {
            history.onpushstate({state: state});
        }
        setTimeout(vi.init, 1000);
        return pushState.apply(history, arguments);
    }
})(window.history, vi);

vi.init();
