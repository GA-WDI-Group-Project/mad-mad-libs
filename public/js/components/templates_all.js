import React from 'react'
import { Link } from 'react-router'

import Firebase from 'firebase'

import AllTemplates from './templates_all/templates_all.js'
import SingleTemplate from './templates_all/templates_single.js'

export default React.createClass({

  getInitialState: function(){
    return{
      templates: []
    }
  },

  componentWillMount: function(){

      this.firebaseRef = new Firebase("https://amber-heat-1866.firebaseio.com/templates");
      this.firebaseRef.on("child_added", function(dataSnapshot) {

        if (dataSnapshot.val().title){ //should probably change from checking title to something else seeing as we'll want to add a title to the completed stories.
          this.state.templates.push(dataSnapshot.val());
        }
        this.forceUpdate()

      }.bind(this));

    },

    renderTemplates: function(key){
      return (
        <SingleTemplate key={key} template={this.state.templates[key]} />
      )
    },

    render: function(){
      return(
        <div>
          <div id="instructions">Pick a Mad Mad Lib to fill out!</div>
          <AllTemplates templates={Object.keys(this.state.templates).map(this.renderTemplates)} />
          {this.props.children}
        </div>
      );
    }

});
