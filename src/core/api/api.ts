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

