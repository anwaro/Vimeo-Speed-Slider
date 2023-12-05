export class Store<T> {
    private readonly key: string;

    constructor(key: string) {
        this.key = key;
    }

    encode<T>(val: T) {
        return JSON.stringify(val);
    }

    decode<T>(val: string): T {
        return JSON.parse(val);
    }

    set(value: T) {
        try {
            localStorage.setItem(this.key, this.encode(value));
        } catch (e) {
            return;
        }
    }

    get(defaultValue: T): T;
    get(): T | undefined;
    get(defaultValue: T | undefined = undefined): T | undefined {
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
