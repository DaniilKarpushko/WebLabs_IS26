document.addEventListener('DOMContentLoaded', () => {
    const newsForm = document.getElementById('newsForm');
    const newsContainer = document.getElementById('newsContainer');
    const loadNewsButton = document.getElementById('loadNews');

    loadNewsButton.addEventListener('click', () => {
        const savedNews = JSON.parse(localStorage.getItem('newsData')) || [];
        newsContainer.innerHTML = '';
        savedNews.forEach(news => addNewsToGrid(news.title, news.description, news.image));
    });

    function saveNewsToLocalStorage(news) {
        const currentNews = JSON.parse(localStorage.getItem('newsData')) || [];
        currentNews.push(news);
        localStorage.setItem('newsData', JSON.stringify(currentNews));
    }

    function deleteNewsFromLocalStorage(title) {
        let currentNews = JSON.parse(localStorage.getItem('newsData')) || [];
        currentNews = currentNews.filter(news => news.title !== title);
        localStorage.setItem('newsData', JSON.stringify(currentNews));
    }

    function addNewsToGrid(title, description, imageUrl) {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-container';

        let image = document.createElement('img');
        image.src = imageUrl;

        let header = document.createElement('h4');
        header.title = title;

        let desc = document.createElement('p');
        desc.textContent = description;

        let button = document.createElement('button');
        button.classList.add('news-container__button', 'delete-button');
        button.textContent = 'Удалить';

        newsElement.appendChild(image);
        newsElement.appendChild(header);
        newsElement.appendChild(desc);
        newsElement.appendChild(button);


        newsElement.querySelector('.delete-button').addEventListener('click', () => {
            deleteNewsFromLocalStorage(title);
            newsElement.remove();
        });

        newsContainer.appendChild(newsElement);
    }

    newsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('newsTitle').value;
        const description = document.getElementById('newsDescription').value;
        const imageUrl = document.getElementById('newsImage').value;

        addNewsToGrid(title, description, imageUrl);
        saveNewsToLocalStorage({ title, description, image: imageUrl });
        newsForm.reset();
    });
});
