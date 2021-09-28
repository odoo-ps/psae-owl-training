const {Component, tags, mount} = owl;

class Child extends Component {
    static template = tags.xml`<li t-esc="props.value"/>`
}

class ChildWrapper extends Component {
    static template = tags.xml`
    <div>
        <t t-slot="title"/>
        <ol><t t-slot="default"/></ol>
    </div>
    `
}

class Parent extends Component {
    static components = {Child, ChildWrapper}
    static template = tags.xml`
    <div>
        <ChildWrapper>
            <Child value="'first'"/>
            <Child value="'second'"/>
            <Child value="'third'"/>
            <h3 t-set-slot="title">Higher-order components demo</h3>
        </ChildWrapper>
    </div>`;
}

const target = document.getElementById('__owl');


mount(Parent, {target});