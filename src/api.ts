import { Book } from "./interfaces.js"
import { renderBooks } from "./functions.js"

const BASE_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
let localLibrary: Book[] = []


async function callAPI(BASE_URL: string) {
    try {
        const response = await fetch(BASE_URL)
        if (response.status === 200) {
            const data: Book[] = await response.json()
            localLibrary = [...data]
            renderBooks(data)
        } else {
            throw Error()
        }
    } catch (error) {
        console.log(error)
    }
}

export { localLibrary, callAPI, BASE_URL }