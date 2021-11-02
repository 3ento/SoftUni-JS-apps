function solution() {
    async function solve() {
        //articles
        let res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        const data = await res.json();

        //each article gets created and appended
        for (let el of data) {
            let res2 = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${el._id}`);
            const data2 = await res2.json();

            createArticle(el.title, el._id, data2.content);
        }

        function createArticle(title, id, content) {
            const box = e('div', { classList: 'accordion' },
                e('div', { classList: 'head' },
                    e('span', {}, title),
                    e('button', { classList: 'button', id: id }, 'More')),
                e('div', { classList: 'extra' },
                    e('p', {}, content))
            )

            document.getElementById('main').appendChild(box);
            document.getElementById(id).addEventListener('click', ShowHide);
        }

        //show or hide contents
        function ShowHide(ev) {
            const btn = ev.target;
            if (btn.textContent == 'More') {
                btn.parentNode.parentNode.querySelector('.extra').style.display = 'inline-block';
                btn.textContent = 'Less';
            } else if (ev.target.textContent == 'Less') {
                btn.parentNode.parentNode.querySelector('.extra').style.display = 'none';
                btn.textContent = 'More';
            }
        }
    }

    function e(type, attr, ...content) {
        const element = document.createElement(type);

        for (let prop in attr) {
            element[prop] = attr[prop];
        }
        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item);
            }
            element.appendChild(item);
        }

        return element;
    }

    solve();
}
