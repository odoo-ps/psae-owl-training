!function (window, document, owl, Registry, templates, exports) {
    const {Component, useState, tags} = owl;
    const {registry} = Registry;

    class App extends Component {
        constructor() {
            super(...arguments);
            this.state = useState({counter: 0});
        }

        mounted() {
            alert('base App loaded');
        }

        handleClick() {
            ++this.state.counter;
        }

        static template = "App";
    }


    exports.App = App;

    registry.add(App);
    templates.templatesCollection.add('App', `
    <div t-name="App">
        Counter: <span t-esc="state.counter"/> <button t-on-click="handleClick"><span>Add one</span></button> 
    </div>`);
}(this, this.document, this.owl, this.Registry, this.templates, this.Components = this.Components || {});