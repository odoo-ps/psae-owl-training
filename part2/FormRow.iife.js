!function (window, document) {
    const {Component, tags} = owl;

    class FormRow extends Component {
        _capitalize(s) {
            return s.replace(/(\b[a-z](?!\s))/g, x=>x.toUpperCase());
        }

        static template = tags.xml`
        <div>
            <label t-att-for="props.field" t-att-id="props.field" t-esc="_capitalize(props.field)"/>
            <input t-att-name="props.field"/>
        </div>`;
    }

    if (!window.components) window.components = {};
    window.components.FormRow = FormRow;

}(this, this.document);