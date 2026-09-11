const searchInput = document.querySelector('#search-input');
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const ratingInput = document.querySelector('#rating-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');

let books = [];
let searchText = '';

const render = () => {
    list.innerHTML = '';

    const shownBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (shownBooks.length === 0) {
        const li = document.createElement('li');
        li.textContent = '暂无图书';
        list.appendChild(li);
        return;
    }

    shownBooks.forEach(book => {
        const li = document.createElement('li');

        li.textContent =
            `${book.title} - ${book.author} - 评分：${book.rating}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';

        deleteBtn.addEventListener('click', () => {
            const index = books.indexOf(book);
            books.splice(index, 1);
            render();
        });

        li.appendChild(deleteBtn);

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

searchInput.addEventListener('input', () => {
    searchText = searchInput.value;
    render();
});

render();