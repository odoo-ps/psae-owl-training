const {Component, tags, mount} = owl;

class MyComponent extends Component {
    static template = tags.xml`<div>Hello, World!</div>`;
}

const target = document.getElementById('__owl');

mount(MyComponent, {target});