document.addEventListener('DOMContentLoaded', () => {
    const newsForm = document.getElementById('newsForm');
    const newsContainer = document.getElementById('newsContainer');
    const loadNewsButton = document.getElementById('loadNews');

    loadNewsButton.addEventListener('click', () => {
        const savedNews = JSON.parse(localStorage.getItem('newsData')) || [];
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

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = title;

        const header = document.createElement('h4');
        header.textContent = title;

        const desc = document.createElement('p');
        desc.textContent = description;

        // Контейнер для кнопок
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttons';

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Показать комментарии';
        commentButton.addEventListener('click', () => loadComments(newsElement, title));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            deleteNewsFromLocalStorage(title);
            newsElement.remove();
        });

        buttonContainer.appendChild(commentButton);
        buttonContainer.appendChild(deleteButton);

        newsElement.appendChild(image);
        newsElement.appendChild(header);
        newsElement.appendChild(desc);
        newsElement.appendChild(buttonContainer);
        newsContainer.appendChild(newsElement);
    }

    async function loadComments(newsElement, newsTitle) {
        const commentSection = newsElement.querySelector('.comment-section');
        if (commentSection) {
            commentSection.remove(); // Удаляем комментарии, если они уже отображены
            return;
        }

        const newCommentSection = document.createElement('div');
        newCommentSection.className = 'comment-section';
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.textContent = '🔄 Загрузка комментариев...';
        newCommentSection.appendChild(preloader);
        newsElement.appendChild(newCommentSection);

        try {
            // Псевдо-случайная фильтрация
            const filter = Math.random() > 0.5 ? '?id_gte=100' : '?id_lte=200';
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments${filter}`);

            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }

            const comments = await response.json();

            // Удаляем прелоадер
            preloader.remove();

            // Добавляем комментарии
            const commentList = document.createElement('ul');
            commentList.className = 'comment-list';

            comments.slice(0, 5).forEach((comment) => {
                const commentItem = document.createElement('li');

                const commentAuthor = document.createElement('strong');
                commentAuthor.textContent = `${comment.name} (${comment.email})`;

                const commentBody = document.createElement('p');
                commentBody.textContent = comment.body;

                commentItem.appendChild(commentAuthor);
                commentItem.appendChild(commentBody);
                commentList.appendChild(commentItem);
            });

            newCommentSection.appendChild(commentList);
        } catch (error) {
            // Удаляем прелоадер и показываем сообщение об ошибке
            preloader.remove();
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `⚠ Не удалось загрузить комментарии: ${error.message}`;
            newCommentSection.appendChild(errorMessage);
        }
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
