import {AppController} from './controllers/AppController';

const app = new AppController();

function init() {
    if (!app.initApp()) {
        window.setTimeout(init, 2000);
    }
}

document.addEventListener('spfdone', init);

init();
