!function (exports) {
    class Registry {
        constructor() {
            this._components = new Map();
        }

        get(Component) {
            return this._components.get(Component);
        }

        add(Component) {
            this._components.set(Component, Component);
        }

        extend(Component, Mixin) {
            const Base = this._components.get(Component);
            this._components.set(Component, Mixin(Base));
        }
    }

    exports.registry = new Registry();
}(this.Registry = this.Registry || {});