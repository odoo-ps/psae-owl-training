!function (window, document, owl, Registry, Components) {
    const {Component, useState, tags} = owl;
    const {registry} = Registry;
    const {App} = Components;

    const AppMixin = App => class extends App {
        mounted() {
            super.mounted();
            alert('extension 1 loaded');
        }

        handleClick() {
            this.state.counter += 2;
        }
    };

    registry.extend(App, AppMixin);
}(this, this.document, this.owl, this.Registry, this.Components);