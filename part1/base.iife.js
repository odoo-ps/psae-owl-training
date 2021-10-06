!function (window, document, owl, Registry, exports) {
    const {Component, useState, tags} = owl;
    const {registry} = Registry;

    class App extends Component {
        constructor() {
            super(...arguments);
            this.state = useState({counter: 0});
        }

        mounted() {
            alert("base App loaded");
        }

        handleClick() {
            ++this.state.counter;
        }

        static template = tags.xml`
        <div>
            Counter: <span t-esc="state.counter"/> <button t-on-click="handleClick">Click Me</button> 
        </div>`;
    }


    exports.App = App;

    registry.add(App);
}(this, this.document, this.owl, this.Registry, this.Components = this.Components || {});