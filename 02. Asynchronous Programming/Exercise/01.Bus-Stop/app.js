function getInfo() {
    async function solve() {
        const bus_id = document.getElementById('stopId').value;
        const url = `http://localhost:3030/jsonstore/bus/businfo/${bus_id}`;
        const stopName = document.getElementById('stopName');
        const buses = document.getElementById('buses');
        try {

            let data = await fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`${res.status}`)
                    }
                    return res;
                })
                .then(data => data.json());

            stopName.textContent = '';
            buses.innerHTML = '';
            stopName.textContent = data.name;
            for (let el of Object.keys(data.buses)) {
                li = document.createElement('li'); li.textContent = `Bus ${el} arrives in ${data.buses[el]} minutes`;
                document.getElementById('buses').appendChild(li);
            }

        } catch (error) {
            stopName.textContent = 'Error';
            buses.innerHTML = '';
        }
    }

    solve();
}