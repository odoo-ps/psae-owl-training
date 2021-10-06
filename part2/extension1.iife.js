!function (window, document, owl, Registry, Components, templates) {
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

    this.templates.templatesCollection.extend('App', 'button>span', '<span>Add Two</span>', 'replace');

    registry.extend(App, AppMixin);
}(this, this.document, this.owl, this.Registry, this.Components, this.templates);