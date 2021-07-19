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

    constructor(containerId: string, bStore: BStore){
        super(containerId, template);
        this._bStore = bStore;
    }

    render = async (): Promise<void> => {
        const api = new BibleApi();
        const {abbrev, name, book} = await api.getData();

        // 신약 마태복음 추후 수정
        this._bStore.currentBook = this.findRandomNo(book.length);
        if(book[this._bStore.currentBook] == NaN || book[this._bStore.currentBook] == undefined) 
        {
            this.render();
            return;
        }

        const {ch_name, chapter} = book[this._bStore.currentBook];
        this._bStore.currentChapter = this.findRandomNo(chapter.length);
        if(chapter[this._bStore.currentChapter] == NaN || chapter[this._bStore.currentChapter] == undefined) 
        {
            this.render();
            return;
        }

        const {ch_no, verse} = chapter[this._bStore.currentChapter];
        this._bStore._currentVerse = this.findRandomNo(verse.length);
        if(verse[this._bStore.currentVerse] == NaN || verse[this._bStore.currentVerse] == undefined) 
        {
            this.render();
            return;
        }
        const {verse_no, verse_text} = verse[this._bStore.currentVerse];

        this.setTemplateData('abbrev', abbrev);
        this.setTemplateData('name', name);
        this.setTemplateData('ch_name', ch_name);
        this.setTemplateData('ch_no', ch_no);
        this.setTemplateData('verse_no', verse_no);
        this.setTemplateData('verse_text', verse_text);

        this.updateView();
    }

    private findRandomNo(curLen:number)
    {
        let tempNo :number = Math.floor(Math.random() * curLen);
        if(tempNo == null)
        {
            tempNo = 0;
        }
        if(tempNo == NaN)
        {
            tempNo = 0;
        }
        return tempNo;
    }
    
}