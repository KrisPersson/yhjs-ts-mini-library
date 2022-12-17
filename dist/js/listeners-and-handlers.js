import { localLibrary } from "./api.js";
import { elem } from "./globals.js";
import { renderBooks, renderNoResults, renderOverlayBook } from "./functions.js";
function handleSearch() {
    const input = elem.searchInput.value.toLowerCase();
    if (input) {
        elem.booksContainer.innerHTML = '';
        const searchResults = localLibrary.filter(book => {
            return book.title.toLowerCase().includes(input) || book.author.toLowerCase().includes(input);
        });
        if (searchResults.length > 0) {
            renderBooks(searchResults);
        }
        else {
            renderNoResults(input);
        }
        if (searchResults.length < localLibrary.length) {
            const showAllBtn = document.createElement('button');
            showAllBtn.classList.add('show-all-btn');
            showAllBtn.textContent = 'Show All';
            elem.booksContainer.appendChild(showAllBtn);
            showAllBtn.addEventListener('click', () => {
                renderBooks(localLibrary);
            });
        }
    }
}
function handleBookClick(event) {
    const target = event.currentTarget;
    const targetId = target.getAttribute('data-id');
    localLibrary.forEach(book => {
        if (book.id.toString() === targetId) {
            renderOverlayBook(book);
        }
    });
    elem.overlay.classList.remove('hidden');
}
function handleExitClick() {
    elem.overlay.classList.add('hidden');
}
function handleEnter(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}
function attachClickListeners() {
    const allDisplayedBooks = document.querySelectorAll('.book--small');
    allDisplayedBooks.forEach(book => {
        book.addEventListener("click", handleBookClick);
    });
}
elem.overlayExitBtn.addEventListener('click', handleExitClick);
elem.searchBtn.addEventListener('click', handleSearch);
elem.searchInput.addEventListener('keydown', handleEnter);
export { attachClickListeners, handleExitClick };
