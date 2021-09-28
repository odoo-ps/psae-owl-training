!function (window, document, owl, exports) {
    const {Component,tags} = owl;

    class Home extends Component {
        static template = tags.xml`
        <main>
            <h1>This is the home page</h1>
        </main>
        `
    }
    exports.Home = Home;
}(this, this.document, this.owl, this.App.Pages = this.App.Pages || {});