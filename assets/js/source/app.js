// Add the require statements
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Import the GitHubFinder Class
import GitHubFinder from './github-finder-classes'
// Import UI classes
import UI from './ui-classes';

// Init GitHubFinder Class
const github = new GitHubFinder;
// Init UI Class
const ui = new UI;

// Search Input
const searchUser = document.getElementById('search-user');

// Search Input Event Listener
searchUser.addEventListener('keyup', (e) => {
	// Get inputted text
	const userName = e.target.value;

	// Check if the username box is NOT empty then show the user data
	if( userName !== '' ) {
		/**
		 * Get the user details from the GitHub server based on the username provided by the user.
		 * Handel the Resolve & Reject response accordingly
		 * @returns Promise
		 * 
		**/
		github.getUser(userName)
		.then( (response) => {
			// Show the received data on the UI
			ui.showProfile(response.profile);
			ui.showRepos(response.repos);
		})
		.catch( (err) => {
			// Show alert Message for the error
			ui.showAlert(err, 'alert alert-danger');
		} );
	} else {
		// When the user clears the text field - show no profile
		ui.clearProfile();
		// Show the how to section
		ui.showHowTo();
	}
});

// Show the current year in the copyright section
document.querySelector('.curr-year').textContent = (new Date().getFullYear() === 2018) ? new Date().getFullYear().toString() : `2018 - ${new Date().getFullYear().toString()}`;