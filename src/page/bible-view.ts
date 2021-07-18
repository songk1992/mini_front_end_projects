import View from '../core/view';
import { BibleApi } from '../core/api';

const template: string = `
<div class="my_container">
    <div class="my_text">
        <p>작업중</p>
        <p>{{__abbrev__}}</p>
        <p>{{__name__}}</p>
        <p>{{__ch_name__}}</p>
        <p>{{__ch_no__}} - {{__verse_no__}}</p>
        <p>{{__verse_text__}}</p>
    </div>
</div>
`

export default class BibleView extends View {

    constructor(containerId: string){
        super(containerId, template);
    }

    render = async (): Promise<void> => {
        const api = new BibleApi();
        const {abbrev, name, book} = await api.getData();

        // 신약 마태복음 추후 수정
        const {ch_name, chapter} = book[0];
        const {ch_no, verse} = chapter[0];
        const {verse_no, verse_text} = verse[0];
        this.setTemplateData('abbrev', abbrev);
        this.setTemplateData('name', name);
        this.setTemplateData('ch_name', ch_name);
        this.setTemplateData('ch_no', ch_no);
        this.setTemplateData('verse_no', verse_no);
        this.setTemplateData('verse_text', verse_text);

        this.updateView();
    }
}