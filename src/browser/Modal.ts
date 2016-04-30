import * as $ from 'jquery';
import * as _ from 'lodash';

const style = `.modal {
    width: 100%;
    height: 100%;
}`

$('head style').append(style);

export class Modal<T> {
    protected template: _.TemplateExecutor;
    protected $container: JQuery;

    constructor(selector: string) {
        this.$container = $(selector);
        this.$container.on('click', () => this.hide());
    }

    public render(data: T) {
        const compiledTemplate = this.template(data);
        this.$container.html(compiledTemplate);
        this.$container.show();
    }

    protected hide() {
        this.$container.hide();
    }

    protected show() {
        this.$container.show();
    }
}

export default Modal;
