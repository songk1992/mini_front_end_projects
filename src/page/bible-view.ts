import View from '../core/view';
import { BibleApi } from '../core/api';
import BStore from '../store';

const template: string = `
<div class="bible-menu">
<p>작업중</p>
<p>{{__abbrev__}}</p>
<p>{{__name__}}</p>
<a href="#"> 뒤로 가기</a>
</div>

<div class="bible_bg">
    <div class="bible_text">
        <p>{{__ch_name__}} {{__ch_no__}} - {{__verse_no__}}</p>
        <p>{{__verse_text__}}</p>
    </div>
</div>
`

export default class BibleView extends View {

    private _bStore : BStore;
    private _abbrev : string; // TODO 추후 수정
    private _name : string; // TODO 추후 수정
    private _book : any; // TODO 추후 수정
    private _chapter : any; // TODO 추후 수정

    constructor(containerId: string, bStore: BStore){
        super(containerId, template);
        this._bStore = bStore;
        this._abbrev = '';
        this._name = '';
        this._book = null;
        this._chapter = null;

    }

    render = async (): Promise<void> => {

        if(this._book == null)
        {
            const api = new BibleApi();
            const {abbrev, name, book} = await api.getData();

            this._abbrev = abbrev;
            this._name = name;
            this._book = book;
        }

        // 신약 마태복음 추후 수정
        let tempNo : number = Math.floor(Math.random() * this._book.length);
        
        const {ch_name, chapter} = this._book[tempNo];
        if(ch_name == undefined || chapter == undefined)
        {
            return this.render();
        }
        this._chapter = chapter;

        tempNo = Math.floor(Math.random() * this._chapter.length);
        if(typeof(this._chapter.num) == "string")
        {
            return this.render();
        }
        // console.log(this._chapter);
        // console.log(this._chapter[tempNo]);
        // console.log(tempNo);
        const {ch_no, verse} = this._chapter[tempNo];
        if(ch_no == undefined || verse == undefined)
        {
            return this.render();
        }
        
        const {verse_no, verse_text} = verse[this._bStore.currentVerse];
        if(verse_no == undefined || verse_text == undefined)
        {
            return this.render();
        }


        this.setTemplateData('abbrev', this._abbrev);
        this.setTemplateData('name', this._name);
        this.setTemplateData('ch_name', ch_name);
        this.setTemplateData('ch_no', ch_no);
        this.setTemplateData('verse_no', verse_no);
        this.setTemplateData('verse_text', verse_text);

        this.updateView();
    }
    
}