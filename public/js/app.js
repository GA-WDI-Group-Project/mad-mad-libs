'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

import Auth from './components/auth.js'
import Stories from './components/stories.js'
import StoriesN from './components/stories_new.js'
import StoriesS from './components/stories_single.js'
import StoriesM from './components/stories_mine.js'
import StoriesA from './components/stories_all.js'
import Templates from './components/templates.js'
import TemplatesA from './components/templates_all.js'
import TemplatesM from './components/templates_mine.js'
import TemplatesN from './components/templates_new.js'
import TemplatesE from './components/templates_edit.js'

import Meta from './components/meta.js'

import Login from './components/login.js'
import Logout from './components/logout.js'
import Signup from './components/signup.js'

import Welcome from './components/welcome.js'

import Form from './components/form.js'

import Error from './components/error.js'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

let Nav = React.createClass({
  render: function () {
    return(
      <div>
        <div className="nav">

          <div>
            <Link to="/">
              <header className="header">Mad Mad Libs</header>
            </Link>
          </div>

          <div id="navOptions">
            <div className="navOption navStories"><Link to="/stories/"><div>Stories</div></Link></div>
            <div className="navOption navTemplates"><Link to="/templates/"><div>Templates</div></Link></div>
            <div className="navOption navMeta"><Link to="/meta"><div>Meta</div></Link></div>
            <div className="navOption "><Link to="/signup"><div>Sign Up</div></Link></div>
            <div className="navOption "><Link to="/login"><div>Login</div></Link></div>
            <div className="navOption "><Link to="/logout"><div>Log out</div></Link></div>
          </div>

        </div>
          {this.props.children}
      </div>
    )
  }
})

var NotFound = React.createClass({
  render : function() {
    return (
      <Error />
    )
  }
})

let $container = document.getElementById('container');

render((

  <div>
    <Router history={browserHistory}>
      <Route path="/" component={Nav} >
        <IndexRoute component={Welcome}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />

        <Route path="/stories" component={Stories} />
        <Route path="/stories/new/templates/:id" component={StoriesN} />
        <Route path="/stories/:id" component={StoriesS} />
        <Route path="/stories/mine" component={StoriesM} />
        <Route path="/stories/all" component={StoriesA} />
        <Route path="/templates" component={Templates} />
        <Route path="templates_mine" component={TemplatesM} />
        <Route path="/templates/new" component={TemplatesN} />
        <Route path="/templates/:id/edit" component={TemplatesE} />
        <Route path="/meta" component={Meta} />
        <Route path="/form" component={Form} /> {/*not a real Route*/}
        <Route path="/welcome" component={Welcome} />

        <Route path="*" component={NotFound} />

      </Route>
    </Router>

  </div>
)  , $container);
