import { BIBLE_URL } from "../config";
import { BibleData } from '../types';

export default class Api {
    url: string;

    constructor(url: string){
        this.url = url;
    }

    async request<AjaxResponse>(): Promise<AjaxResponse>{
        const response = await fetch(this.url);
        return await response.json() as AjaxResponse;
    }

}

/**
 * 성경을 읽어오는 클래스
 * 추후 필요시 외부 URL 과 연결된 DB로 변경
 */
export class BibleApi extends Api {
    constructor(){
        super(BIBLE_URL);
    }

    async getData(): Promise<BibleData>{
        return this.request<BibleData>();
    }

}
