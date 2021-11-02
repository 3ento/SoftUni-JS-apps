function loadCommits() {
    async function solve() {
        const ul = document.getElementById('commits');
        try {
            const username = document.getElementById('username').value;
            const repository = document.getElementById('repo').value;
            const url = `https://api.github.com/repos/${username}/${repository}/commits`

            let data = await fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`${res.status}`)
                    }
                    return res;
                })
                .then(data => data.json());

            ul.innerHTML = '';
            for (let el of data) {
                li = document.createElement('li');
                li.textContent = `${el.commit.author.name}: ${el.commit.message}`;
                ul.appendChild(li);
            }
        } catch (error) {
            ul.innerHTML = '';
            li = document.createElement('li');
            li.textContent = `${error} (Not Found)`;
            ul.appendChild(li);
        }
    }

    solve();
}