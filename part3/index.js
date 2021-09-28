const {Component, tags, hooks, mount} = owl;
const {useRef, useState} = hooks;

class MyComponent extends Component {
    constructor() {
        super(...arguments);
    }

    setup() {
        console.info('setup() called');
        this.state = useState({counter: 0});
        this.myInput = useRef('myInput');
    }

    async willStart() {
        console.info('willStart() called');
    }

    mounted() {
        console.info('mounted() called');
        this.myInput.el.style.color = 'red';
        console.info(this.myInput.el.tagName + ' is now red');
    }

    async willUpdateProps() {
        console.info('willUpdateProps() called');
    }

    willPatch() {
        console.info('willPatch() called');
    }

    patched() {
        console.info('patched() called');
    }

    willUnmount() {
        console.info('willUnmount() called');
    }

    catchError() {
        console.info('catchError() called');
    }

    incrementCounter(e) {
        ++this.state.counter;
    }

    static template = tags.xml`
    <div>
        <input type="text" t-model="state.counter" t-ref="myInput"/>
        <button t-on-click="incrementCounter">Increment</button>
    </div>`;
}

const target = document.getElementById('__owl');

mount(MyComponent, {target});