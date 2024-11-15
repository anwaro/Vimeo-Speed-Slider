import {AppController} from './controllers/AppController';

const app = new AppController();

let attempt = 0;

function init() {
    if (attempt <= 4 && !app.init()) {
        attempt++;
        window.setTimeout(init, 2000);
    }
}

init();
