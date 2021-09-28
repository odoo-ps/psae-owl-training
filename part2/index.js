const {Component, tags, mount} = owl;

class MyComponent extends Component {
    constructor() {
        super(...arguments);
        this.boolean = false;
        this.orderedList = ['An example showing', 'how you could', 'use an array', 'for generating', 'an ordered list'];
        this.otherTemplate = tags.xml`<div><em>This is the content of the other template</em></div>`;
        this.tag = "h2"
    }

    handleClickMeBtn(e) {
        alert('You have clicked me!');
    }

    static template = tags.xml`
    <div>
        <h2>QWeb Demo</h2>
        <br/>
        <h4>t-foreach</h4>
        <ul>
            <li>Used for generating multiple components based on an iterable</li>
            <li t-foreach="orderedList" t-as="item" t-esc="item"/>
        </ul>
        
        <br/>
        <hr/>
        <br/>
        
        <h4>t-esc</h4>
        <p>Used for rending a value into a component</p>
        <p>The value of this.boolean is <strong t-esc="boolean.toString()"/></p>
        <p>Notice that t-esc takes javascript expressions. I have actually passed it "boolean.toString()" since 'false' 
        and nullish values won't be rendered</p>
        
        <br/>
        <hr/>
        <br/>
        
        <h4>t-if/t-elif/t-else</h4>
        <p>Used to conditionally render components. The next example is utilizing this.boolean</p>
        <p t-if="boolean">If you're seeing this line, this.bool is <strong>true</strong></p>
        <p t-else="">If you're seeing this line, this.bool is <string>false</string></p>
        
        <br/>
        <hr/>
        <br/>
        
        <h4>t-call</h4>
        <p>t-call is used for rendering the contents of a template into another template given its id</p>
        <p>I stored a template in this.otherTemplate. Surround it with "{{}}" to treat it as a variable since t-call takes literals</p>
        <t t-call="{{otherTemplate}}"/>
        
        <br/>
        <hr/>
        <br/>
        
        <h4>t-on-*</h4>
        <p>Takes a handle of a function acting like an event listener</p>
        <button t-on-click="handleClickMeBtn">Click Me!</button>
                
        <br/>
        <hr/>
        <br/>
        
        <h4>t-tag</h4>
        <p>Used for dynamically generating an element's tag based on a variable</p>
        <t t-tag="tag">This is a &lt;<t t-esc="tag"/>&gt;</t> 
                
        <br/>
        <hr/>
        <br/>
    </div>`;
}

const target = document.getElementById('__owl');

mount(MyComponent, {target});