!function (exports) {
    class Templates {
        constructor() {
            this._templates = {};
            this.parser = new DOMParser();
        }

        add(name, body) {
            this._templates[name] = body;
        }

        extend(name, selector, changes, position) {
            const template = this.parser.parseFromString(this._templates[name], 'application/xml');
            const target = template.querySelector(selector);
            changes = this.parser.parseFromString(changes, 'application/xml');

            switch (position) {
                case 'replace':
                    target.parentElement.replaceChild(changes.documentElement, target);
                    break;
                case 'before':
                    target.parentElement.insertBefore(changes.documentElement, target);
                    break;
                case 'after':
                    target.parentElement.insertBefore(changes.documentElement, target.nextSibling);
                    break;
                case 'inside':
                    target.append(changes);
                    break;
            }

            this._templates[name] = template.documentElement.outerHTML;
        }

        get(name) {
            return this._templates(name);
        }

        compile() {
            return `<templates>${Object.values(this._templates).join("\n\n")}</templates>`
        }
    }

    exports.templatesCollection = new Templates();
}(this.templates = this.templates || {});