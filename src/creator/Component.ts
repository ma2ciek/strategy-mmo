export interface IComponent {
    initialize(...args: any[]): any;
    
}

export default class Component {
    protected canvas: HTMLCanvasElement;
    
    constructor() {
        
    }
    
    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }
}