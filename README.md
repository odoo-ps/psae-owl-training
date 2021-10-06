Odoo Dubai
==========

#### OWL Framework training

By Alaa Youssef (AYO) - Client Solution Developer

Resources:

- Official OWL docs [link](https://github.com/odoo/owl/tree/master/doc)
- OWL releases [link](https://github.com/odoo/owl/releases)

------------------

Advanced Topics:
----------------

In this tutorial, we are going to go through some more advanced topics that are crucial for integrating OWL within a
multitude of applications.

The purpose of this tutorial is switching from using OWL as a stand-alone app to a tool that could be used for extending
Odoo's frontend client.

---

#### 1. Inheriting "in-place"

Odoo
uses [a class registry object](https://github.com/odoo/odoo/blob/14.0/addons/point_of_sale/static/src/js/ClassRegistry.js)
for their PoS client. The purpose of that practice is to allow the PoS web app to be easily-extendable.

In this tutorial, we are going to create a simplified version of that object.

Assume that you have the following setup:

```javascript
class MyClass extends Object {
    constructor() {
        super();
        this.x = 5;
    }
}

const MyMixin = Parent => class extends Parent {
    constructor() {
        super();
        this.y = 7;
    }
}

const testObj = new (MyMixin(MyClass))();

console.log(testObj); // {x: 5, y: 7}
```

Such setup allows us to have an extendable chain of inheritance.

JS provides a perfect data structure for this use-case: `Map`.

Unlike normal Objects, Maps allow you to map anything to anything.

```javascript
class Registry {
    constructor() {
        this._components = new Map();
    }

    get(Component) {
        return this._components.get(Component);
    }

    add(Component) {
        this._components.set(Component, Component);
    }

    extend(Component, Mixin) {
        const Base = this._components.get(Component);
        this._components.set(Component, Mixin(Base));
    }

}
```

With this new Object, we could have a centralized extension system that ensures that you are always using the latest
version of a given class.

```javascript
const registry = new Registry();

// somewhere in code
class App extends owl.Component {
    // ...
}

registry.add(App);

// other place in the code

const AppMixin1 = App => class extends App {
    // ...
}

registry.extend(App, AppMixin1);


// what you mount:
const LatestAppVesrsion = registry.get(App);
const target = document.getElementById('__owl');
owl.mount(LatestAppVesrsion, {target});
```

In this part, we're building a relatively simple App that takes advantage of our `Registry` in order to create
extendable components.

---

#### 2- Template Extension

Continuing with the extensibility theme we have started in the previous exercise, it is possible to attach templates
using a pre-made xml file. To achieve that, you pass the value of your template's `t-name` QWeb directive to your
Component's `static template`.

Odoo has a [system](https://github.com/odoo/odoo/blob/14.0/odoo/tools/template_inheritance.py) for extending xml files
using xpaths.

In this part, we are going to build a system for extending templates. It is not going to be as comprehensive as Odoo's.

In order to achieve that, we are going to define templates as strings. Then, we are going to use some special JS objects
to extend them. Additionally, those strings will be assigned to the root component's environment.

Remember that the environment is a property that resides on the constructor of an OWL Component that holds a `QWeb`
instance. We could pass a property `templates` to that QWeb instance. It should contain a valid XML string with
root `<templates>`.

```javascript
class YourCompoenent extends owl.Component {
    static template = "YourCompoenent";
}

YourCompoenent.env = {
    qweb: new QWeb({
        templates: `
<templates>
    <t t-name="YourCompoenent">
        <span> Hello, World! </span>
    </t>
</templates>`
    })
};
```

---

#### Conclusions: OWL and Odoo

In this tutorial, we have showcased a proposed method of creating extendable applications using OWL. Since odoo's
architectures consists of multiple modules that could be extended, OWL would be a perfect framework for creating Odoo's
frontend.

Unfortunately, OWL has not been fully-integrated within odoo just yet (current version 14). Nevertheless, multiple apps
still heavily relay on OWL.

The best example that comes to mind is the PoS app.

Odoo's PoS App makes good use of the concepts that were covered in this tutorial.

First, templates are created and are saved within separate xml files. Then, they are run through multiple tools (
including the xpathing tool mentioned earlier) to handle inheritance. Last, they are compiled into a singe xml string
that is loaded into the PoS root component's (`Chrome`) environment.

Note that you will only have to worry about "creating the templates" part. The rest is done automatically.

```xml
<!--THE PARENT-->
<templates>
    <t t-name="MyComponent" owl="1">
        <div>
            Hello,
        </div>
    </t>
</templates>
```

```xml
<!--THE CHILD-->
<templates>
    <t t-inherit="parent_module_name.MyComponent" t-inherit-mode="extension" owl="1">
        <xpath expr="//div" position="inside">
            World!
        </xpath>
    </t>
</templates>
```

The previous two templates compile into the following:

```xml
<!--COMPILES INTO-->
<templates>
    <t t-name="parent_module_name.MyComponent">
        <div>
            Hello,World
        </div>
    </t>
</templates>
```

It could be retrieved from the session object that is exported from the `web.Session` module. It is done
in [main.js](https://github.com/odoo/odoo/blob/14.0/addons/point_of_sale/static/src/js/main.js#L33). The starting point
of the POS app.

OWL templates are distinguished from other templates using the `owl` attribute. Additionally, the directory those
templates should be added to the manifest.

```python
# __manifest__.py
{
    # ...
    'qweb': ['static/xml/xml_1.xml', '...', 'static/xml/xml_n.xml'],
    # ...
}
```