!function (window, document, owl, exports) {
    const {Component,tags} = owl;

    class NotFound extends Component {
        static template = tags.xml`
        <main>
            <br/>
            <h1>404</h1>
            <br/>
            <br/>
            <h1>Page not found</h1>
        </main>
        `
    }
    exports.NotFound = NotFound;
}(this, this.document, this.owl, this.App.Pages = this.App.Pages || {});