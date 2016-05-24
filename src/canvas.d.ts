declare module "canvas" {
    namespace Canvas {
        export const Image: HTMLImageElement;
    }

    class Canvas extends HTMLCanvasElement {
        constructor(width?: number, height?: number);
    }

    export = Canvas;
} 