import { fetchTopBooks } from './api';
import { createBookCard } from './book-popup';
import { el } from './refs';
import { createSelectedCategory } from './selected-category-sec';
import Notiflix from 'notiflix';
createTopBooks();

function createTopBooks() {
  fetchTopBooks()
    .then(bookData => {
      const markup = bookData.map((book) => `
      <div>
        <h3 class="top-title">${book.list_name}</h3>
        <div class="swiper">
          <ul class="list-item swiper-wrapper">
            ${book.books.slice(0, 5).map((book) => `
              <li class="li-top js-book-on-click swiper-slide" data-id="${book._id}">
               <div class="card-container">
          <div class="card">
            <img class="img-top" src="${book.book_image || './images/shopping-list-sec/plug_x1.png'}"
     srcset="${book.book_image || './images/shopping-list-sec/plug_x1.png'} 1x, 
             ${book.book_image || './images/shopping-list-sec/plug_x2.png'} 2x"  alt="Зображення відсутнє" />

            <div class="overlay">
               <p class="quick-view">quick view</p>
             </div>
          </div>
       </div>
                <p class="top-bookTitle">${book.title}</p>
                <p class="top-bookAuthor">${book.author}</p>
              </li>`).join("")}
          </ul>
        </div>
      </div>
        <div class="top-button">
          <button class="top-bth top-bth-js" data-category="${book.list_name}" type="submit">see more</button>
        </div>
      `).join("");
        
      // Додаємо всі розмітки до елемента списку
      el.list.innerHTML =
        '<h1 class="top-title-boks">Best Sellers <span class="top-title-span">Books</span></h1><div class="list-top" id="list">' +
        markup +
        '</div>';

      el.topOfCatecory = document.querySelectorAll('.list-item');
      el.topOfCatecory.forEach(oneTopCategory =>
        oneTopCategory.addEventListener('click', createBookCard)  
      );

    el.buttonSeeMore = document.querySelectorAll(".top-bth-js");
        el.buttonSeeMore.forEach((button) => {
      button.addEventListener("click", handleSeeMore);
    });
    })
    .catch(error => {
      console.log('Помилка отримання або обробки даних:', error);
      // alert ('Помилка отримання або обробки даних:')
      // Notiflix.Notify.Failure('Что-то пошло не так!');
    })
    .finally(() => {});
}

function handleSeeMore(ev) {
    
    
    const categoryTittle = ev.target.dataset.category.trim();
    
    createSelectedCategory(categoryTittle);
}
export { createTopBooks };