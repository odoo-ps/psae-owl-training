!function (window, document, owl, exports) {
    const {Component,tags} = owl;

    class About extends Component {
        static template = tags.xml`
        <main>
            <h1>This is the about page</h1>
        </main>
        `
    }
    exports.About = About;
}(this, this.document, this.owl, this.App.Pages = this.App.Pages || {});