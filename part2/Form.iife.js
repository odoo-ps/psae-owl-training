!function (window, document) {
    const {Component, tags} = owl;

    class Form extends Component {
        constructor() {
            super(...arguments);
            if (!this.props.onSubmit) throw new Error('Must provide onSubmit');
        }

        static defaultProps = {
            submitText: 'Submit',
        };

        static template = tags.xml`
        <form t-on-submit="props.onSubmit">
            <t t-slot="default"/>
            <input type="submit" t-att-value="props.submitText"/>
        </form>`;
    }

    if (!window.components) window.components = {};
    window.components.Form = Form;

}(this, this.document);