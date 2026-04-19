export interface Marker {
    color?: string | string[];
    size?: number | number[];
    symbol?: string | string[];
    opacity?: number | number[];
    line?: {
        color?: string;
        width?: number;
    }
}

export interface Trace {
    x: number[];
    y: number[];
    type?: 'scatter' | 'bar' | 'pie'; // Expandable
    mode?: 'markers' | 'lines' | 'lines+markers' | 'text' | 'none';
    marker?: Marker;
    name?: string;
}

export interface LayoutAxis {
    title?: string;
    showgrid?: boolean;
    zeroline?: boolean;
    range?: [number, number];
    tickcolor?: string;
    gridcolor?: string;
}

export interface Layout {
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
    }
}
