!function (window, document, owl, Pages, exports) {
    const {Home, About, ContactUs, NotFound} = Pages;
    exports.routes = [
        {name: 'HOME', path: '/', component: Home},
        {name: 'ABOUT', path: '/about', component: About},
        {name: 'CONTACT_US', path: '/contact-us', component: ContactUs},
        {name: 'NOT_FOUND', path: '/not-found', component: NotFound},
        {name: 'UNKNOWN', path: '*', redirect: {to: 'NOT_FOUND'}},
    ];
}(this, this.document, this.owl, this.App.Pages, this.App = this.App || {});