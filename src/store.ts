import { BibleStore } from "./types";

export default class BStore implements BibleStore{
    _currentBook: number;
    _currentChapter: number;
    _currentVerse: number;
constructor(cb : number =0, cc : number =0, cv : number =0){
    this._currentBook = cb;
    this._currentChapter = cc;
    this._currentVerse = cv;
}

get currentBook(){
    return this._currentBook;
}

set currentBook(cb: number){
   this._currentBook = cb;
}

get currentChapter(){
    return this._currentChapter;
}

set currentChapter(cc: number){
   this._currentChapter = cc;
}

get currentVerse(){
    return this._currentVerse;
}

set currentVerse(cv: number){
   this._currentVerse = cv;
}

}