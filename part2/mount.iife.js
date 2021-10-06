!function (document, owl, Components, Registry, templates) {
    const {mount, QWeb} = owl;
    const {App} = Components;
    const {registry} = Registry;

    const FinalApp = registry.get(App);

    FinalApp.env = {qweb: new QWeb({templates: templates.templatesCollection.compile()})}

    const target = document.getElementById('__owl');
    mount(FinalApp, {target});
}(this.document, this.owl, this.Components, this.Registry, this.templates);