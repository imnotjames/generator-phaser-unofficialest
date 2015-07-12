module.exports = {};

<% for ( var state in states ) { %>
module.exports[<%- JSON.stringify(state) %>] = require(<%- JSON.stringify(states[state]) %>);
<% } %>
