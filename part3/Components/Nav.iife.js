!function (window, document, owl, exports) {
    const {Component, tags, router} = owl;
    const {Link} = router;

    class Nav extends Component {
        static components = {Link}
        static style = tags.css`
            nav {
                display: flex;
                padding-left: 1em;
                background: teal;
            }
            
            nav > * {
                padding: 0.5em 1em;
                margin-left: 1em;
                color: white;
                text-decoration: none;
                font-size: 24px;
                font-family: sans-serif;
            }
            
            nav > *:hover {
                color: black;
                background: white;
            }
            
            .router-link-active {
                background: white;
                color: black;
            }
        `

        static template = tags.xml`
        <nav>
            <Link to="'HOME'">Home</Link>
            <Link to="'ABOUT'">About</Link>
            <Link to="'CONTACT_US'">Contact Us</Link>
        </nav>`
    }

    exports.Nav = Nav;
}(this, this.document, this.owl, this.App.Components = this.App.Components || {});