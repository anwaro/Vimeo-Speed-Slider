export class Observer {
    private observer?: MutationObserver;

    stop() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    start(element: HTMLElement, callback: MutationCallback) {
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
