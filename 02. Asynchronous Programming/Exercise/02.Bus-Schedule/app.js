function solve() {
    let id = 'depot';
    async function depart() {
        try {
            const url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;
            let data = await fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`${res.status}`)
                    }
                    return res;
                })
                .then(data => data.json());


            document.getElementsByClassName('info')[0].textContent = `Next stop ${data.name}`
            document.getElementById('depart').disabled = true;
            document.getElementById('arrive').disabled = false;
        } catch (error) {
            document.getElementById('info').textContent = `Error`
        }
    }

    async function arrive() {
        try {
            const url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;
            let data = await fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`${res.status}`)
                    }
                    return res;
                })
                .then(data => data.json());


            document.getElementsByClassName('info')[0].textContent = `Arriving at ${data.next}`
            document.getElementById('depart').disabled = false;
            document.getElementById('arrive').disabled = true;

            id = data.next;
        } catch (error) {
            document.getElementById('info').textContent = `Error`
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();