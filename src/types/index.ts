import View from '../core/view';

export interface RouteInfo {
    path: string;
    page: View;
  }

export interface BibleStore {
  currentBook : number,
  currentChapter : number,
  currentVerse : number,

}

export interface BibleData {
  readonly abbrev: string,
  readonly name: string,
  readonly book: any[],
  // readonly ch_name: any,
  // readonly chapter: [number, string],
  // readonly ch_no: number,
  // readonly verse: string
}