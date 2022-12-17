import { localLibrary } from "./api.js"
import { elem } from "./globals.js"
import { renderBooks, renderNoResults, renderOverlayBook } from "./functions.js"
import { Book } from "./interfaces.js"


function handleSearch(): void {
    const input: string = elem.searchInput.value.toLowerCase()

    if (input) {
        elem.booksContainer.innerHTML = ''
        const searchResults: Book[] = localLibrary.filter(book => {
            return book.title.toLowerCase().includes(input) || book.author.toLowerCase().includes(input)
        })
        if (searchResults.length > 0) {
            renderBooks(searchResults)
        } else {
            renderNoResults(input)
        }
        if (searchResults.length < localLibrary.length) {

            const showAllBtn = document.createElement('button')
            showAllBtn.classList.add('show-all-btn')
            showAllBtn.textContent = 'Show All'

            elem.booksContainer.appendChild(showAllBtn)
            showAllBtn.addEventListener('click', () => {
                renderBooks(localLibrary)
            })
        }
    }
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

function handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        handleSearch()
    }
}

function attachClickListeners(): void {
    const allDisplayedBooks: NodeList = document.querySelectorAll('.book--small')
    allDisplayedBooks.forEach(book => {
        book.addEventListener("click", handleBookClick)
    })
}

elem.overlayExitBtn.addEventListener('click', handleExitClick)
elem.searchBtn.addEventListener('click', handleSearch)
elem.searchInput.addEventListener('keydown', handleEnter)

export { attachClickListeners, handleExitClick }