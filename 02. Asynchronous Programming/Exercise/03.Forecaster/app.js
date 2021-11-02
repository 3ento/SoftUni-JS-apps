function attachEvents() {
    document.getElementById('submit').addEventListener('click', solve);
    function current_weather(current_conditions) {
        document.getElementById('current').innerHTML = '';
        let a = document.createElement('div'); a.className = 'label'; a.textContent = 'Current conditions'
        document.getElementById('current').appendChild(a);

        const weatherSymbols = {
            'Sunny': '\u2600',
            'Partly sunny': '\u26C5',
            'Overcast': '\u2601',
            'Rain': '\u2614',
            'Degrees': '\u00B0',
        }

        //current

        let symbol = document.createElement('span');
        symbol.className = 'condition symbol';
        symbol.textContent = weatherSymbols[current_conditions.forecast.condition];

        let wrapper = document.createElement('span');
        symbol.classList.add('condition')

        let name_country = document.createElement('span');
        name_country.classList.add('forecast-data');
        name_country.textContent = current_conditions.name;

        let degree = document.createElement('span');
        degree.classList.add('forecast-data');
        degree.textContent = `${current_conditions.forecast.low}\u00B0/${current_conditions.forecast.high}\u00B0`;

        let cond = document.createElement('span');
        cond.classList.add('forecast-data');
        cond.textContent = current_conditions.forecast.condition;

        wrapper.appendChild(name_country);
        wrapper.appendChild(degree);
        wrapper.appendChild(cond);

        document.getElementById('current').appendChild(symbol);
        document.getElementById('current').appendChild(wrapper);
    }
    function three_day(el, outer_wrapper) {

        const weatherSymbols = {
            'Sunny': '\u2600',
            'Partly sunny': '\u26C5',
            'Overcast': '\u2601',
            'Rain': '\u2614',
            'Degrees': '\u00B0',
        }

        let inner_wrapper = document.createElement('span');
        inner_wrapper.className = 'upcoming';

        let symbol = document.createElement('span');
        symbol.className = 'symbol';
        symbol.textContent = weatherSymbols[el.condition];

        let degree = document.createElement('span');
        degree.classList.add('forecast-data');
        degree.textContent = `${el.low}\u00B0/${el.high}\u00B0`;

        let cond = document.createElement('span');
        cond.classList.add('forecast-data');
        cond.textContent = el.condition;

        inner_wrapper.appendChild(symbol);
        inner_wrapper.appendChild(degree);
        inner_wrapper.appendChild(cond);

        outer_wrapper.appendChild(inner_wrapper);
    }

    async function solve() {
        try {
            const location = document.getElementById('location').value;
            let code = '';
            const data = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`${res.status}`)
                    }
                    return res;
                })
                .then(data => data.json());

            for (el of Object.values(data)) {
                if (el.name == location) {
                    code = el.code;
                }
            }

            const current_conditions = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`${res.status}`)
                    }
                    return res;
                })
                .then(data => data.json());


            const three_day_forecast = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`${res.status}`)
                    }
                    return res;
                })
                .then(data => data.json());

            if (Object.keys(current_conditions).length == 3) {
                throw new Error();
            }
            document.getElementById('forecast').style.display = '';

            //current
            current_weather(current_conditions);

            //three day
            document.getElementById('upcoming').innerHTML = '';
            let a = document.createElement('div');
            a.className = 'label';
            a.textContent = 'Three-day forecast'
            document.getElementById('upcoming').appendChild(a);
            for (let el of three_day_forecast.forecast) {
                let outer_wrapper = document.createElement('div');
                outer_wrapper.classList.add('forecast-info');

                let name_country = document.createElement('div');
                name_country.classList.add('label');
                name_country.textContent = el.name;

                three_day(el, outer_wrapper);

                document.getElementById('upcoming').appendChild(name_country);
                document.getElementById('upcoming').appendChild(outer_wrapper);
            }

        } catch (error) {
            document.getElementById('upcoming').innerHTML = '';
            document.getElementById('current').innerHTML = '';
            document.getElementById('forecast').style.display = '';
            let a = document.createElement('div'); a.textContent = error
            document.getElementById('forecast').appendChild(a);
        }
    }
}

attachEvents();