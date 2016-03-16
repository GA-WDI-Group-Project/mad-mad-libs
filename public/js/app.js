'use strict';

const React          = require('react');
const ReactDOM       = require('react-dom');
const $              = require('jquery');

const TheComponent   = require('./components/component.js');
const auth           = require('./components/auth_helpers');
const ReactRouter    = require('react-router');

const Router         = ReactRouter.Router;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

let App = React.createClass({
  render: function() {
    return (
        <div>
          <TheComponent name='Component'/>
        </div>
    );
  }
});

const authComponent = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
})

const About = React.createClass({
  render() {
    return <h1>About</h1>
  }
})

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

let $container = document.getElementById('container');

ReactDOM.render(<div>
                  <Router history={browserHistory}>
                    <Route path="/" component={authComponent}>
                      <Route path="login" component={Login} />
                      <Route path="logout" component={Logout} />
                      <Route path="about" component={About} />
                      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
                    </Route>
                  </Router>
                  <App />
                </div>, $container);
