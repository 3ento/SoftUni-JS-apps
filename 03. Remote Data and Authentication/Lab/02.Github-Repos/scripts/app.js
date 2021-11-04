function loadRepos() {
	async function solve() {
		const username = document.getElementById('username').value;
		const list = document.getElementById('repos');

		try {
			let data = await fetch(`https://api.github.com/users/${username}/repos`);
			if (!data.ok) {
				throw new Error(`${data.status} ${data.statusText}`);
			}
			let json = await data.json();
			list.innerHTML = '';
			for (let el of json) {
				let li = document.createElement('li');
				let a = document.createElement('a');
				a.textContent = el.full_name;
				a.href = el.html_url;

				li.appendChild(a);
				list.appendChild(li);
			}
			document.getElementById('username').value = '';
		} catch (error) {
			list.innerHTML = '';
			let li = document.createElement('li'); li.textContent = error;

			list.appendChild(li);
		}
	}

	solve();
}
