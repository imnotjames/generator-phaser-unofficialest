module Game {
	export class KnownStates {

<% for ( var state in states ) { %>
		static <%- state %> = <%- JSON.stringify(states[state]) %>;
<% } %>

	};
}
