export class Renderer {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;

    constructor(container: HTMLElement, width: number, height: number) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'block';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        container.appendChild(this.canvas);
        
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error("Could not initialize 2D context");
        }
        this.ctx = context;
        this.width = width;
        this.height = height;

        this.resize(width, height);
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        
        // Handle High-DPI displays
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}
