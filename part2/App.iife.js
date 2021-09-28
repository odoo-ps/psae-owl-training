!function (window, document) {
    const {Component, tags, mount} = owl;
    const {Form, FormRow} = components;

    class App extends Component {
        constructor() {
            super(...arguments);
            this.formOutput = {};

            this.onSubmit = this.onSubmit.bind(this)
        }
        onSubmit(e) {
            e.preventDefault();
            this.formOutput = {};
            for (const [k, v] of (new FormData(e.target))) this.formOutput[k] = v;
            alert(JSON.stringify(this.formOutput, null, 2));
        }

        static components = {Form, FormRow};
        static template = tags.xml`
        <div>
            <h3>Testing &lt;Form&gt; and &lt;FormRow&gt;</h3>
             <Form onSubmit="onSubmit">
                <FormRow field="'name'"/>
                <FormRow field="'age'"/> 
            </Form>
        </div>`;
    }

    const target = document.getElementById('__owl');

    mount(App, {target});
}(this, this.document);