export default abstract class View {
    private template: string;
    private renderTemplate: string;
    private container: HTMLElement;

    constructor(containerId: string, template:string){
        const containerElement = document.getElementById(containerId);

        if(!containerElement){
            throw '최상위 컨테이너가 존재하지 않습니다.';
        }

        this.container = containerElement;
        this.template = template;
        this.renderTemplate = template;
    }

    protected updateView(): void {
        this.container.innerHTML = this.renderTemplate;
        this.renderTemplate = this.template;
      }

    protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    abstract render(...params: string[]): void;
}