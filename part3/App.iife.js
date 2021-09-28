!function (window, document, owl, Components, Pages, routes, exports) {
    const {Component, router, QWeb, tags, utils, mount} = owl;
    const {Router, RouteComponent} = router;

    async function makeEnv(env = {}) {
        env.qweb = new QWeb;
        env.router = new Router(env, routes, {mode: "hash"});
        await env.router.start();
        return env;
    }

    async function setup(Component) {
        Component.env = await makeEnv();
        const target = document.getElementById('__owl');
        await mount(Component, {target});
    }

    class App extends Component {
        static components = {RouteComponent, ...Pages, ...Components}
        static template = tags.xml`
        <div>
            <Nav/>
            <RouteComponent/>
        </div>`
    }

    utils.whenReady(setup.bind(window, App));

    exports.App = App;
}(this, this.document, this.owl, this.App.Components, this.App.Pages, this.App.routes, this.App);