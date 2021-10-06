!function (document, owl, Components, Registry) {
    const {mount} = owl;
    const {App} = Components;
    const {registry} = Registry;

    const FinalApp = registry.get(App);

    const target = document.getElementById('__owl');
    mount(FinalApp, {target});
}(this.document, this.owl, this.Components, this.Registry);