// Add the require statements of es6-promise polyfill & isomorphic-fetch to make sure after js compilation, the fetch works on old browsers like IE 11, 10.
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

// Add click event lister for checking the repo sort dropdown click using event deligation as the element is added dynamically
let selectIndex = 99;
document.getElementById('profile').addEventListener('click', (e) => {
	if(e.target.classList.contains('repo-sort')) {
		// Selected Index List:
		// 0: Nothing
		// 1 : Latest Created
		// 2: Latest Updated
		const userName = document.getElementById('search-user').value;
		if(selectIndex !== e.target.selectedIndex) {
			selectIndex = e.target.selectedIndex;
			if(selectIndex === 0) {
				github.getUser(userName, 'created')
				.then( (response) => {
					document.getElementById('repos').innerHTML = `<img src="../img/loading.gif" id="loading"/>`;
					setTimeout(() => {
						document.getElementById('loading').remove();
						ui.showRepos(response.repos);
					}, 2000);
				})
				.catch( (err) => {
					ui.showAlert(err, 'alert alert-danger');
				});
			} else if( selectIndex === 1 ) {
				github.getUser(userName, 'pushed')
				.then( (response) => {
					document.getElementById('repos').innerHTML = `<img src="../../img/loading.gif" id="loading"/>`;
					setTimeout(() => {
						document.getElementById('loading').remove();
						ui.showRepos(response.repos);
					}, 2000);
				})
				.catch( (err) => {
					ui.showAlert(err, 'alert alert-danger');
				});
			}
		}
	}
});

// Show the current year in the copyright section
document.querySelector('.curr-year').textContent = (new Date().getFullYear() === 2018) ? new Date().getFullYear().toString() : `2018 - ${new Date().getFullYear().toString()}`;