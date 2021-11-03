function attachEvents() {
    let comms_dict = {};
    let posts_dict = {};

    document.getElementById('btnLoadPosts').addEventListener('click', posts_req);
    document.getElementById('btnViewPost').addEventListener('click', comments_req);

    async function posts_req() {
        const posts_data = await fetch('http://localhost:3030/jsonstore/blog/posts');
        const posts = await posts_data.json();

        for (let el of Object.values(posts)) {
            createOptions(el.id, el.title, el.body)
            comms_dict[el.id] = {};
            posts_dict[el.id] = el.body;
        }
    }

    async function comments_req() {
        const comments_data = await fetch('http://localhost:3030/jsonstore/blog/comments');
        const comments = await comments_data.json();

        //comms_dict ids init
        for (let el of Object.values(comments)) {
            comms_dict[el.postId] = [];
        }

        //comms_dict comments
        for (let el of Object.values(comments)) {
            comms_dict[el.postId].push(el.text);
        }

        //switching between comments and texts for different options
        document.getElementById('post-comments').innerText = '';
        document.getElementById('post-body').textContent = '';
        for (let com of comms_dict[document.getElementById('posts').value]) {
            document.getElementById('post-body').textContent = posts_dict[document.getElementById('posts').value];
            document.getElementById('post-comments').appendChild(
                e('li', {}, com)
            )
        }


    }

    function createOptions(val, title) {
        const option = e('option', { value: val }, title);
        document.getElementById('posts').appendChild(option);
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
}
try {
    attachEvents();
} catch (error) {
    console.log(error);
}
