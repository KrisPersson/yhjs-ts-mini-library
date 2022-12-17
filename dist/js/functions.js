import { elem } from "./globals.js";
import { attachClickListeners, handleExitClick } from "./listeners-and-handlers.js";
function renderNoResults(input) {
    const html = `<h2>No matches for "${input}" :(</h2>`;
    elem.booksContainer.innerHTML = html;
}
function renderBooks(data) {
    const html = data.reduce((acc, book) => {
        return acc += `
        <article class="book book--small" data-id="${book.id}" style="background:${book.color}">
                <section class="book__bg">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </section>
        </article>
        `;
    }, '');
    elem.booksContainer.innerHTML = html;
    attachClickListeners();
}
function renderOverlayBook(book) {
    var _a;
    const html = `
        <section class="overlay__container">
            <button class="overlay__exit-btn"><img src="./img/arrow.png" alt="Exit"></button>
            <article class="book book--big" style="background:${book.color}">
                <section class="book__bg default-cursor">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </section>
            </article>
            <article class="book__info">
                <h2>${book.title}</h2>
                <h4>${book.author}</h4>
                <p>${shortenPlot(book)}</p>
                <section class="info__more-info">
                    <p class="more-info__p">Audience: <span>${book.audience}</span></p>
                    <p class="more-info__p">First published: <span>${book.year}</span></p>
                    <p class="more-info__p">Pages: <span>${book.pages}</span></p>
                    <p class="more-info__p">Publisher: <span>${book.publisher}</span></p>
                </section>
                <button class="read-it-btn">Oh, I want to read it!</button>
            </article>
        </section>
    `;
    elem.overlay.innerHTML = html;
    (_a = document.querySelector('.show-text-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const showTextBtn = document.querySelector('.show-text-btn');
        const moreInfo = document.querySelector('.info__more-info');
        const hiddenText = document.querySelector('.hidden-plot');
        const dots = document.querySelector('.dots');
        showTextBtn.classList.toggle('flip');
        moreInfo.classList.toggle('hidden');
        hiddenText.classList.toggle('hidden');
        dots.classList.toggle('hidden');
    });
    const exitBtn = document.querySelector('.overlay__exit-btn');
    exitBtn.addEventListener('click', handleExitClick);
}
function shortenPlot(book) {
    const plotArr = book.plot.split('');
    const titleArr = book.title.split('');
    if (plotArr.length > 520 && titleArr.length > 20) {
        const abbrPlot = [];
        const overFlow = [];
        for (let i = 0; i < plotArr.length; i++) {
            if (i < 460) {
                abbrPlot.push(plotArr[i]);
            }
            else {
                overFlow.push(plotArr[i]);
            }
        }
        return abbrPlot.join('') + `<span class="hidden-plot hidden">${overFlow.join('')}</span>` + '<span class="dots">...</span>' + '<i class="show-text-btn fa-solid fa-caret-down"></i>';
    }
    return book.plot;
}
export { renderBooks, renderNoResults, renderOverlayBook };
