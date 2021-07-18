import View from '../core/view';

export interface RouteInfo {
    path: string;
    page: View;
  }

export interface BibleStore {

}

export interface BibleData {
  readonly abbrev: string,
  readonly name: string,
  readonly book: string
}