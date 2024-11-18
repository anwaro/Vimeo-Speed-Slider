export class GlobalStyle {
    static addStyle(key: string, styles: string) {
        const style =
            document.getElementById(key) ||
            (function () {
                const style = document.createElement('style');
                style.id = key;
                document.head.appendChild(style);
                return style;
            })();
        style.textContent = styles;
    }
}
