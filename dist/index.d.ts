interface Marker {
    color?: string | string[];
    size?: number | number[];
    symbol?: string | string[];
    opacity?: number | number[];
    line?: {
        color?: string;
        width?: number;
    };
}
interface Trace {
    x: number[];
    y: number[];
    type?: 'scatter' | 'bar' | 'pie';
    mode?: 'markers' | 'lines' | 'lines+markers' | 'text' | 'none';
    marker?: Marker;
    name?: string;
}
interface LayoutAxis {
    title?: string;
    showgrid?: boolean;
    zeroline?: boolean;
    range?: [number, number];
    tickcolor?: string;
    gridcolor?: string;
}
interface Layout {
    title?: string;
    xaxis?: LayoutAxis;
    yaxis?: LayoutAxis;
    width?: number;
    height?: number;
    margin?: {
        l?: number;
        r?: number;
        b?: number;
        t?: number;
        pad?: number;
    };
}

declare class Plot {
    private renderer;
    private data;
    private layout;
    private margins;
    private plotWidth;
    private plotHeight;
    constructor(container: HTMLElement, data: Trace[], layout?: Layout);
    private draw;
    private minX;
    private maxX;
    private minY;
    private maxY;
    private calculateBounds;
    private mapX;
    private mapY;
    private drawAxes;
    private drawData;
}

declare class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    constructor(container: HTMLElement, width: number, height: number);
    resize(width: number, height: number): void;
    clear(): void;
}

declare function newPlot(target: string | HTMLElement, data: Trace[], layout?: Layout): Plot;

export { type Layout, type LayoutAxis, type Marker, Plot, Renderer, type Trace, newPlot };
