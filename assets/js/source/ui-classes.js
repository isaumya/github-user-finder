/**
 * UI Class for handling UI operations
**/
export default class UI {
	constructor() {
		this.profile = document.getElementById('profile');
	}

	// Method for CLear Profile
	clearProfile() {
		this.profile.innerHTML = '';
	}

	// Method for showing profile
	showProfile(user) {
		// Clear any alert messages that might be showing in the UI
		this.clearAlert();

		// Hide the how to section
		this.hideHowTo();

		// If the user has any website then wap it inside anchor tag else show no details provided
		let userWebsite;
		if(user.blog === '') {
			userWebsite = '<span class="badge badge-warning">No Details Provided</span>';
		} else {
			userWebsite = `<a href="${user.blog}" target="_blank">${user.blog}</a>`;
		}

		// Check if the Company is null then show "No Details Provided" else show the details
		let userCompany;
		if(user.company === null || user.company === '') {
			userCompany = '<span class="badge badge-warning">No Details Provided</span>';
		} else {
			userCompany = user.company;
		}

		// Check if the user location is provided then use that else show "No Data Provided"
		let userLocation;
		if(user.location === null || user.location === '') {
			userLocation = '<span class="badge badge-warning">No Details Provided</span>';
		} else {
			userLocation = user.location;
		}

		// Check the hiring status of the user
		let hiringStatus;
		if(user.hireable === null || user.hireable === false) {
			hiringStatus = `<span class="badge badge-danger">No</span>`;
		} else {
			hiringStatus = `<span class="badge badge-success">Yes</span>`;
		}

		// Show the profile data
		this.profile.innerHTML = `
		<div class="card card-body mb-3">
			<div class="row">
				<div class="col-md-3">
					<img src="${user.avatar_url}" class="img-fluid mb-2">
					<a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-3">View Profile</a>
				</div>
				<div class="col-md-9">
					${this.createBadge('badge-primary', 'Public Repos', user.public_repos, user.login, 'repositories')}
					${this.createBadge('badge-secondary', 'Public Gists', user.public_gists, user.login, 'gists')}
					${this.createBadge('badge-success', 'Followers', user.followers, user.login, 'followers')}
					${this.createBadge('badge-info', 'Following', user.following, user.login, 'following')}
					<div class="mb-3"></div>
					<ul class="list-group">
						<li class="list-group-item"><strong>Company:</strong> <span class="ml-2">${userCompany}</span></li>
						<li class="list-group-item"><strong>Website/Blog:</strong> <span class="ml-2">${userWebsite}</span></li>
						<li class="list-group-item"><strong>Location:</strong> <span class="ml-2">${userLocation}</span></li>
						<li class="list-group-item"><strong>Member Since:</strong> <span class="ml-2">${new Date(user.created_at).toString()}</span></li>
						<li class="list-group-item"><strong>Want to be Hired:</strong> <span class="ml-2">${hiringStatus}</span></li>
					</ul>
				</div>
			</div>
		</div>
		<h3 class="page-heading mb-3">Latest 5 Repos</h3>
		<div id="repos"></div>
		`;
	}

	// Method for creating the badges inside show profile section
	createBadge(className, heading, count, userName, urlModifier) {
		if(count === 0) {
			return `<span class="badge ${className}">${heading}: ${count}</span>`;
		} else {
			// Check if the urlModifier is 'gist' then add it before else use the normal github url
			const url = (urlModifier === 'gists') ? `https://gist.github.com/${userName}` : `https://github.com/${userName}/${urlModifier}`;
			return `<a href="${url}" target="_blank"><span class="badge ${className}">${heading}: ${count}</span></a>`;
		}
	}

	// Method for showing the repos of the user below their profile
	showRepos(repos) {
		// Create a output variable
		let output = '';
		// Check if it is a blank array i.e. the user has no repos to show, otherwise list the repos
		if(repos.length === 0) {
			output = `
			<div class="card text-white bg-primary mb-2">
				<div class="card-body">
					<h4 class="card-title">So Sorry! 😟</h4>
					<p class="card-text">It Seems that the user has no public repositories in GitHub. May be it's a new profile or maybe the user has created the GitHub account, but never actually used it, in any case, there is no Github repositories to show here. Sorry! 😟</p>
				</div>
			</div>
			`;
		} else {
			repos.forEach( (repo) => {
				// Check if the repo has any public demo url or homepage link provided, then show that as well
				let homepage;
				if(repo.homepage === null || repo.homepage === '') {
					homepage = '';
				} else {
					homepage = `<a href="${repo.homepage}" target="_blank" class="btn btn-primary mb-3">Visit Homepage/Demo Website</a>`;
				}

				// Check if the repo has any project description, then show it
				let projectDesc;
				if(repo.description === null || repo.description  === '') {
					projectDesc = '';
				} else {
					projectDesc = `<p class="repo-description card-text">${repo.description}</p>`;
				}

				output += `
				<div class="card card-body mb-2">
					<div class="row align-items-center">
						<div class="col-md-6">
							<h4 class="card-title"><a href="${repo.html_url}">${repo.name}</a> ${this.getLangIcon(repo.language)}</h4>
							${projectDesc}
							${homepage}
						</div>
						<div class="col-md-6 align-self-center">
							<span class="badge badge-warning">Stars: ${repo.stargazers_count}</span>
							<span class="badge badge-info">Watchers: ${repo.watchers_count}</span>
							<span class="badge badge-success">Forks: ${repo.forks_count}</span>
						</div>
					</div>
				</div>
				`;
			});
		}
		// Display the output inside #repos
		document.getElementById('repos').innerHTML = output;
	}

	// Method for showing Language Icons
	getLangIcon(lang) {
		let langIcon;
		switch(lang) {
			case "ASP":
				langIcon = `<i class="devicon-dot-net-plain-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "C" :
				langIcon =  `<i class="devicon-c-line-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "C++" :
				langIcon = `<i class="devicon-cplusplus-line-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "C#" :
			case "Objective-C++":
				langIcon =  `<i class="devicon-csharp-line-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "CSS" :
				langIcon = `<i class="devicon-html5-plain-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "Go" :
				langIcon =  `<i class="devicon-go-plain colored ml-2" title="${lang}"></i>`;
				break;
			case "HTML":
				langIcon = `<i class="devicon-html5-plain-wordmark colored ml-2"></i>`;
				break;
			case "Java":
				langIcon =  `<i class="devicon-java-plain colored ml-2" title="${lang}"></i>`;
				break;
			case "JavaScript":
				langIcon =  `<i class="devicon-javascript-plain orange-colored ml-2" title="${lang}"></i>`;
				break;
			case "LESS":
				langIcon = `<i class="devicon-less-plain-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "Python":
				langIcon =  `<i class="devicon-python-plain-wordmark orange-colored ml-2" title="${lang}"></i>`;
				break;
			case "Rails":
				langIcon =  `<i class="devicon-rails-plain-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "Ruby":
				langIcon = `<i class="devicon-ruby-plain-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "SASS":
				langIcon = `<i class="devicon-sass-original colored ml-2" title="${lang}"></i>`;
				break;
			case "Swift":
				langIcon = `<i class="devicon-swift-plain-wordmark colored ml-2" title="${lang}"></i>`;
				break;
			case "TypeScript":
				langIcon = `<i class="devicon-typescript-plain colored ml-2" title="${lang}"></i>`;
				break;
			default:
				if(lang === null) {
					langIcon = '';
				} else {
					langIcon = `<span class="badge badge-info lang-badge ml-3">Language: ${lang}</span>`;
				}
				break;
		}
		return langIcon;
	}

	// Method for Show Alert Message
	showAlert(msg, className) {
		// Check if there is any existing alert already showing up in the UI, if so, first remove it, then show the new alert message
		this.clearAlert();
		// Create alert div
		const alertDiv = document.createElement('div');
		// Add the passed on classes
		alertDiv.className = className;
		// Add the Text Message
		alertDiv.appendChild( document.createTextNode(msg) );
		// Insert the alert to the UI
		// Get parent
		const container = document.querySelector('.search-container');
		// Get the element before which you wanna insert the alert
		const searchBox = document.querySelector('.search');
		// Insert the alert to the UI
		container.insertBefore(alertDiv, searchBox);
		// Automatically remove the alert message from the UI after 3 seconds
		setTimeout( () => {
			this.clearAlert();
		}, 3000 );
	}

	// Method for clearing alert message
	clearAlert() {
		const currentAlert = document.querySelector('.alert');

		// check if any alert exists then remove it
		if(currentAlert) {
			currentAlert.remove();
		}
	}

	// Method for hiding the how to section
	hideHowTo() {
		document.getElementById('how-to').style.display = 'none';
	}

	// Method for un-hiding the how to section
	showHowTo() {
		document.getElementById('how-to').style.display = 'block';
	}
}