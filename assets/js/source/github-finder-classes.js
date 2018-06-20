/**
 * GitHub Finder Class
 * @version 1.0.0
 * @author Saumya Majumder
 * @license GPL
 * @returns Promises
**/
export default class GitHubFinder {
	constructor() {
		this.client_id = '63efe4f7da3f2257e398';
		this.client_secret = 'c18ca07325c29934f7bf6facae47231455fd7e56';
		this.repo_count = 5;
		//this.repo_sort = 'created: asc';
	}

	// Create Get User Method
	async getUser(user, repo_sort = 'created') {
		// Set up the try-catch block
		try {
			// Fetch the GitHub Profile API and Await for it
			const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

			// As GitHub API will return "Not Found" for profiles that does not exists,
			// there is no need to do the response check as we can simply check the 
			// returned message and see if it is a not found
			let profileData;
			if (profileResponse.ok) {
				// Get the profile data as JSON and await for it
				profileData = await profileResponse.json();
			} else {
				if (profileResponse.status === 404) {
					throw new Error('Profile Not Found.');
				} else {
					throw new Error(`Some Network Error Happened while fetching the Users! ERROR Code: ${profileResponse.status}`);
				}
			}

			// Fetch the GitHub API for fetching the latest repos by that user
			const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repo_count}&sort=${repo_sort}&order=asc&client_id=${this.client_id}&client_secret=${this.client_secret}`);

			// Check if the response is OK, else throw error
			let repoData;
			if(repoResponse.ok) {
				repoData = await repoResponse.json();
			} else {
				throw new Error(`Some Network Error Happened while fetching the User Repos! ERROR Code: ${repoResponse.status}`);
			}

			// Return all the data as an object
			return {
				profile: profileData,
				repos: repoData
			};
		} catch(err) {
			throw new Error(err.message);
		}
	}
}