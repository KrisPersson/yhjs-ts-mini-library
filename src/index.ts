import { Book } from "./interfaces.js"

const BASE_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"

const elem = {
    booksContainer: document.querySelector('.books-container') as HTMLElement,
    overlayExitBtn: document.querySelector('.overlay__exit-btn') as HTMLButtonElement,
    overlay: document.querySelector('.overlay') as HTMLElement
}

let localLibrary: Book[] = []

async function callAPI(BASE_URL: string) {
    try {
        const response = await fetch(BASE_URL)
        if (response.status === 200) {
            const data: Book[] = await response.json()
            localLibrary = [...data]
            renderBooks(data)

            for (let book of localLibrary) {
                shortenPlot(book)
            }

        } else {
            throw Error()
        }
    } catch (error) {
        console.log(error)
    }
}

function renderBooks(data: Book[]): void {

    const html = data.reduce((acc, book) => {
        return acc += `
        <article class="book book--small" data-id="${book.id}" style="background:${book.color}">
                <section class="book__bg">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </section>
        </article>
        `
    }, '')

    elem.booksContainer.innerHTML = html
    attachClickListeners()
}

function renderOverlayBook(book: Book): void {
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
    `
    elem.overlay.innerHTML = html

    document.querySelector('.show-text-btn')?.addEventListener('click', () => {

        const showTextBtn = document.querySelector('.show-text-btn') as HTMLElement
        const moreInfo = document.querySelector('.info__more-info') as HTMLElement
        const hiddenText = document.querySelector('.hidden-plot') as HTMLSpanElement
        const dots = document.querySelector('.dots') as HTMLSpanElement

        showTextBtn.classList.toggle('flip')
        moreInfo.classList.toggle('hidden')
        hiddenText.classList.toggle('hidden')
        dots.classList.toggle('hidden')

    })

    const exitBtn = document.querySelector('.overlay__exit-btn') as HTMLButtonElement
    exitBtn.addEventListener('click', handleExitClick)
}

function shortenPlot(book: Book): string {
    const plotArr: string[] = book.plot.split('')
    const titleArr: string[] = book.title.split('')

    if (plotArr.length > 520 && titleArr.length > 20) {
        const abbrPlot: string[] = []
        const overFlow: string[] = []
        for (let i = 0; i < plotArr.length; i++) {
            if (i < 460) {
                abbrPlot.push(plotArr[i])
            } else {
                overFlow.push(plotArr[i])
            }
        }
        return abbrPlot.join('') + `<span class="hidden-plot hidden">${overFlow.join('')}</span>` + '<span class="dots">...</span>' + '<i class="show-text-btn fa-solid fa-caret-down"></i>'
    }

    return book.plot
}


function handleBookClick(event: Event): void {

    const target = event.currentTarget as HTMLElement
    const targetId: string = target.getAttribute('data-id') as string
    localLibrary.forEach(book => {
        if (book.id.toString() === targetId) {
            renderOverlayBook(book)
        }
    })

    elem.overlay.classList.remove('hidden')

}

function handleExitClick(): void {
    elem.overlay.classList.add('hidden')
}

function attachClickListeners(): void {
    const allDisplayedBooks: NodeListOf<HTMLElement> = document.querySelectorAll('.book--small')

    allDisplayedBooks.forEach(book => {
        book.addEventListener("click", handleBookClick)
    })
}

elem.overlayExitBtn.addEventListener('click', handleExitClick)

// attachClickListeners()
callAPI(BASE_URL)
