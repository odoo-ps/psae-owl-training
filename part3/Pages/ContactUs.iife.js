!function (window, document, owl, exports) {
    const {Component,tags} = owl;

    class ContactUs extends Component {
        static template = tags.xml`
        <main>
            <h1>This is the contact us page</h1>
        </main>
        `
    }
    exports.ContactUs = ContactUs;
}(this, this.document, this.owl, this.App.Pages = this.App.Pages || {});