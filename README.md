Odoo Dubai
==========

#### OWL Framework training


By Alaa Youssef (AYO) - Client Solution Developer


Resources:
- Official OWL docs [link](https://github.com/odoo/owl/tree/master/doc)
- OWL releases [link](https://github.com/odoo/owl/releases)

------------------

Basic Setup:
------------

In this tutorial, we are going to use an iife file to load owl into an HTML file. 
Additionally, we are going to explore the basic features and best practices that OWL offers. 

#### 0. Downloading the latest version of OWL and setting up your environment
1. Access the link provided in the resources 
2. Download `owl.iife.min.js`
3. Create a basic html file. Add the following to its `<body>`

```javascript
<div id="__owl"></div>
<script type="text/javascript" src="owl.iife.min.js"></script>
```

---

#### 1. Creating and mounting an OWL Component
1. Create and import a new js file. It should be loaded after `owl.iife.min.js`
2. You will have access to a global variable `owl` get `Component`, `tags`, and `mount` from it
    ```javascript
    const {Component, tags, mount} = owl;
    ```
3. Inherit `Component` and seup your template
```javascript
class MyComponent extends Component {
  static template = tags.xml`<div>Hello, World!</div>`;
}
```
4. Mount your component. In the 0th step, we have created a div with id=__owl. Mount your component there.
```javascript
const target = document.getElementById("__owl");
mount(MyComponent, {target});
```

Congratulations! You have mounted your first OWL component! Let's do more 

---

#### 2. QWEB Templating Language
As the name implies, `owl.tags.xml` is a function that takes an xml string as its
set of arguments.

OWL was built, first and foremost, to be used in developing the Odoo client. Since
its early days, odoo has been depending on xml files for dealing with views and 
other kinds of templates such as reports. Additionally, Odoo uses xpathing in order
to extend already-existing templates.

This resulted in the creation of the QWeb templating language with its different 
variants.

In addition to your "traditional" QWeb directive, owl has introduced multiple new
ones. They could be found [here](https://github.com/odoo/owl/blob/master/doc/reference/qweb_templating_language.md#directives).

In the folder [part2](https://github.com/ayo-odoo/odoo-psae-owl-training/tree/basic_setup/part2), 
you could find an example using some of those.

---

#### 3. Hooks and lifecycle methods

Similar to react, OWL components have methods that get called before/after certain stages.

1. `setup()`: use this if you don't want to play with the constructor
2. `async willStart()`: an `async` function that runs right before the *FIRST* render. You could use it for fetching data from server for example 
3. `mounted()`: called when the DOM is ready
4. `async willUpdateProps()`: right before props are changed. `<Component thisISAProp="someVal"/>`
5. `willPatch()`: before DOM is patched (after render() or props updates)
6. `willUnmount()`: When the Component is about to be removed from dom handle garbage collection here
7. `catchError()`: you could handle rendering errors here

In addition to the previous methods, hooks could also be used to systematically add properties to your components

> Note that hooks are intended to be used in either the constructor, or `setup()`.

##### Here are some useful hooks:
###### 1. useState(obj: object): Proxy
Takes a parameter, let's call it `obj`, and uses it to generate a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) Object.
The proxy's setter calls the Component's `render()`. In other words, any changes in that proxy forces your component to be re-rendered.

```javascript
class YourComponent extends owl.Component {
    setup() {
        this.state = owl.hooks.useState({value: 0});
    }
    
    handleClick(e) {
        ++this.state.value; // this will force a re-render
    }
}
```

This hook is quite useful with the `t-model` QWeb directive. `t-model` is typically used with input
tags. The value of that input element will be drawn from the state, and changes in that input will be pushed 
into that state effectively forcing a re-render.

There is another hook that acts in a similar mannter `useContext`. Use it when you need to manage state across 
multiple components. 

###### 2. useRef(name: string): {el: HTMLElement}

Instead of having to use `document.querySelector()` in `mounted()`, you could use `t-ref` in the template
in addition to `useRef` in the class definition to get a reference to a DOM element.

```xml
<!--In the template-->
<div t-ref="myRef">some text</div>
```

```javascript
// in the class definition
this.myRef = useRef("myRef");
this.myRef.el; // this will return an HTMLElement
```

##### on\<LifeCycleMethod\>
1. `onMounted(cb: function)`
2. `onWillUnmount(cb: function)`
3. `onWillPatch(cb: function)`
4. `onPatched(cb: function)`
5. `onWillStart(cb: async function)`

Those don't necessarily have to be set on an OWL Component. They are particularly useful for mixins and 
functions that will be called in a Component's `constructor()` or `setup()`