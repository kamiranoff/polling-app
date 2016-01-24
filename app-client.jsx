var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;


var APP = require('./components/APP.jsx');
var Audience = require('./components/Audience.jsx');
var Speaker = require('./components/Speaker.jsx');
var Board = require('./components/Board.jsx');
var NotFound = require('./components/404.jsx');


var routes = (
  <Route path="/" component={APP}>
    <IndexRoute component={Audience}/>
    //<Route name="audience" path="audience" component={Audience}></Route>
    <Route name="speaker" path="speaker" component={Speaker}></Route>
    <Route name="board" path="board" component={Board}></Route>
    <Route path="*" component={NotFound} />
  </Route>
)


ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('react-container'));
