Odoo Dubai
==========

#### OWL Framework training

By Alaa Youssef (AYO) - Client Solution Developer

Resources:

- Official OWL docs [link](https://github.com/odoo/owl/tree/master/doc)
- OWL releases [link](https://github.com/odoo/owl/releases)

------------------

Dealing with Multiple Components:
------------

In this tutorial, we're going to setup multiple Components and use them in one root component.

#### 1. Creating child components

First, create and mount your root Component similar to the previous tutorial. Then, Create multiple additional
components and add them to your root Component

It is important to note that OWL Components have multiple static properties. Bellow are some of the most important ones

1. `defaultProps: object` if certain props were not provided, or have a nullish value, fallback to those
2. `template: string` a reference to a template
    1. Returned from `owl.tags.xml()`
    2. The `t-name` value of an xml template in a xml file
3. `style: string` for inline stylesheet references. Returned from `owl.tags.css`
4. `components: {[name: string]: owl.Component}` an object mapping tag names (to be used in xml) to their designated OWL
   Components

```javascript
class Child extends owl.Component {
    static template = owl.tags.xml`<div>I am the child</div>`;
}

class Parent extends owl.Component {
    static components = {Child};

    static template = owl.tags.xml`
        <div>
            I am the parent
            <Child />
        </div>`
}
```

##### Using `t-slot`

If a parent is meant to wrap a child (or multiple), you could use `t-slot` in its template to determine where those
children are supposed to be rendered

---

#### 2. Best Practices

It's a common practice to split your code into multiple files. In JS specifically, it is common to see 1 major function
per file.

> Note that we will only be dealing with `iife`'s in this tutorial. The most common practice in the
> market is using a bundler such as Webpack. But that's far beyond the scope of this tutorial

> Note that this is merely a suggested flow. Feel free to have your own based on your team or company

In this part, we will start calling out root Component `App`, and we will be storing it in a separate file `app.iife.js`
.

`IIFE` stands for "Immediately-Invoked Function Expression". As the name implies, the contents of an
`iife` file are all wrapped with a function that "calls itself"

```javascript
// method 1
!function (window, document) {
    // code goes here
}(this, this.document);
```

```javascript
// method 2
(function (window, document) {
    // code goes here
})(this, this.document);
```

This practice ensures that the global scope is not polluted with variables. Furthermore, it could potentially have a
security benefit since scopes will have only what you set them to have.

For example, we could "export" a component like this

```javascript
// MyComponent.iife.js
!function (window, document) {
    class MyComponent extends owl.Component {
        // ...
    }

    if (!window.components) window.components = {};
    window.components.MyComponent = MyComponent;
}(this, this.document);
```

This way, all JS files that are loaded after `MyComponent.iife.js` will have access to a global variable `components`

---

#### 3. Environment and Routing

In this part, we're going to create an SPA (Single-Page Application). An application that seemingly has multiple pages.
But in reality, it has a single html file.

When an SPA use clicks on a link, it re-renders certain parts of the page. This effectively eliminates the need for
expensive page reloads.

In order to achieve that, we must add some `routes` to the root Component's environment. The environment is an object
that could be for multiple purposes including session management. Additionally, it includes an instance of `owl.QWeb`.

In order to add routes, we need to manually assign an environment to our root component (the children by default inherit
it).

First, creates your routes:

```javascript
const routes = [
    {name: 'HOME', path: '/', component: Home},
    {name: 'ABOUT', path: '/about', component: About},
    {name: 'CONTACT_US', path: '/contact-us', component: ContactUs},
];
```

Then write a function for generating an environment that includes the routes. For this specific setup, we need 2
properties:

1. qweb: and instance of `owl.QWeb`, the engine that will be used for generating templates
2. router: an instance of `owl.Router`

> note that you need to call router.start() before mounting your component. That function returns a Promise that gets
> resolved when it's done executing

> We are using the router in `hash` mode. This is guaranteed to work with static files (no server)

```javascript
async function makeEnv(env = {}) {
    env.qweb = new owl.QWeb;
    env.router = new owl.router.Router(env, routes, {mode: "hash"});
    await env.router.start();
    return env;
}
```

Then, create a function in which you could assign this environment to your component

```javascript
async function setup(Component) {
    Component.env = await makeEnv();
    const target = document.getElementById('__owl');
    await owl.mount(Component, {target});
}
```

For good measure, call your setup function when DOM is ready. `owl.utils.whenReady(cb: function)` could be used for that

At this point, you could use the `owl.router.Link` component to create links. Pass what you have assigned to name to
the `to` prop

```javascript
<Link to="'HOME'">Home</Link>
```

Upon route changes, the Component of the proper route will be rendered inside the `owl.router.RouteComponent` component.

The template of your root component will look something like this:

```xml

<div>
    <Nav/>
    <RouteComponent/>
</div>
```

---

Exercise:
---------

Make an SPA that satisfies the following:

1. A page with an introduction about yourself. Use as many abstractions as possible
2. A page with a todo list.
    1. You may use localStorage to make your changes "stick"
    2. Create an array of users. Add a selection component that allows you to choose which user is currently using the
       todo list page. Each user should have their own list
    3. (bonus) check the docs to learn about dynamic routes. Use dynamic routes to immediately choose a user based on
       the route
