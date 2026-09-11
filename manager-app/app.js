const searchInput = document.querySelector('#search-input');
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const ratingInput = document.querySelector('#rating-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');

let books = JSON.parse(localStorage.getItem('books') || '[]');
const save = () => {
    localStorage.setItem('books', JSON.stringify(books));
};
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
            save();
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

    if (title === '' || author === '' || rating === '') {
        tip.textContent = '请完整填写书名、作者和评分';
        return;
    }

    if (Number(rating) < 1 || Number(rating) > 10) {
        tip.textContent = '评分请输入1到10之间的数字';
        return;
    }

    tip.textContent = '';



    books.push({
        title: title,
        author: author,
        rating: rating
    });

    save();

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