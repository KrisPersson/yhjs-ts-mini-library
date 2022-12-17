var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderBooks } from "./functions.js";
const BASE_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let localLibrary = [];
function callAPI(BASE_URL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(BASE_URL);
            if (response.status === 200) {
                const data = yield response.json();
                localLibrary = [...data];
                renderBooks(data);
            }
            else {
                throw Error();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
export { localLibrary, callAPI, BASE_URL };
