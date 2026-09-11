const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const ratingInput = document.querySelector('#rating-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');

let books = [];

const render = () => {
    list.innerHTML = '';

    if (books.length === 0) {
        const li = document.createElement('li');
        li.textContent = '暂无图书';
        list.appendChild(li);
        return;
    }

    books.forEach(book => {
        const li = document.createElement('li');

        li.textContent =
            `${book.title} - ${book.author} - 评分：${book.rating}`;

        list.appendChild(li);
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const rating = ratingInput.value;

    books.push({
        title: title,
        author: author,
        rating: rating
    });

    titleInput.value = '';
    authorInput.value = '';
    ratingInput.value = '';

    render();
});

render();