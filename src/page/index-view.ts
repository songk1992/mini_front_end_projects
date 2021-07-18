import View from '../core/view';

const template = `     
<div class="my_container">
    <div class="my_text">
        <a href="#/bible/"> 성경Api</a>
        <a href="#"> N사 클론 코딩</a>
    </div>
</div>
`;

export default class IndexView extends View {
    
    constructor(containerId: string){
        super(containerId, template);  
    }

    render(){
        // TODO : 작업중
        this.updateView();
    }
}

    