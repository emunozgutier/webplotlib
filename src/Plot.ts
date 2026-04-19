import { Trace, Layout } from "./types";
import { Renderer } from "./Renderer";

export class Plot {
    private renderer: Renderer;
    private data: Trace[];
    private layout: Layout;
    
    private margins = { t: 50, r: 50, b: 50, l: 60 };
    private plotWidth: number = 0;
    private plotHeight: number = 0;

    constructor(container: HTMLElement, data: Trace[], layout: Layout = {}) {
        // Handle responsive container or layout sizing
        const width = layout.width || container.clientWidth || 600;
        const height = layout.height || container.clientHeight || 400;

        this.renderer = new Renderer(container, width, height);
        this.data = data;
        this.layout = layout;
        
        if (layout.margin) {
            this.margins = { ...this.margins, ...layout.margin };
        }

        this.draw();
    }

    private draw() {
        this.renderer.clear();
        this.calculateBounds();
        this.drawAxes();
        this.drawData();
    }

    private minX = 0;
    private maxX = 0;
    private minY = 0;
    private maxY = 0;

    private calculateBounds() {
        this.plotWidth = this.renderer.width - this.margins.l - this.margins.r;
        this.plotHeight = this.renderer.height - this.margins.t - this.margins.b;

        let initializedX = false;
        let initializedY = false;
        
        this.minX = Number.MAX_VALUE;
        this.maxX = Number.MIN_VALUE;
        this.minY = Number.MAX_VALUE;
        this.maxY = Number.MIN_VALUE;

        for (const trace of this.data) {
            for (let i = 0; i < trace.x.length; i++) {
                const x = trace.x[i];
                if (x < this.minX) this.minX = x;
                if (x > this.maxX) this.maxX = x;
                initializedX = true;
            }
            for (let i = 0; i < trace.y.length; i++) {
                const y = trace.y[i];
                if (y < this.minY) this.minY = y;
                if (y > this.maxY) this.maxY = y;
                initializedY = true;
            }
        }

        // Apply Layout ranges if provided
        if (this.layout.xaxis?.range) {
            this.minX = this.layout.xaxis.range[0];
            this.maxX = this.layout.xaxis.range[1];
        } else if (!initializedX) {
            this.minX = 0; this.maxX = 1;
        }

        if (this.layout.yaxis?.range) {
            this.minY = this.layout.yaxis.range[0];
            this.maxY = this.layout.yaxis.range[1];
        } else if (!initializedY) {
            this.minY = 0; this.maxY = 1;
        }
        
        // Add small padding to bounds if they match exactly
        if (this.minX === this.maxX) { this.minX -= 1; this.maxX += 1; }
        if (this.minY === this.maxY) { this.minY -= 1; this.maxY += 1; }
    }

    private mapX(x: number): number {
        return this.margins.l + ((x - this.minX) / (this.maxX - this.minX)) * this.plotWidth;
    }

    private mapY(y: number): number {
        return this.renderer.height - this.margins.b - ((y - this.minY) / (this.maxY - this.minY)) * this.plotHeight;
    }

    private drawAxes() {
        const { ctx, height } = this.renderer;

        ctx.strokeStyle = "#444";
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // Y Axis
        ctx.moveTo(this.margins.l, this.margins.t);
        ctx.lineTo(this.margins.l, height - this.margins.b);
        
        // X Axis
        ctx.moveTo(this.margins.l, height - this.margins.b);
        ctx.lineTo(this.margins.l + this.plotWidth, height - this.margins.b);
        ctx.stroke();

        ctx.fillStyle = "#333";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        
        // Basic labels
        ctx.fillText(this.minX.toFixed(2), this.mapX(this.minX), height - this.margins.b + 20);
        ctx.fillText(this.maxX.toFixed(2), this.mapX(this.maxX), height - this.margins.b + 20);
        
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(this.minY.toFixed(2), this.margins.l - 10, this.mapY(this.minY));
        ctx.fillText(this.maxY.toFixed(2), this.margins.l - 10, this.mapY(this.maxY));

        // Title
        if (this.layout.title) {
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.font = "bold 16px Arial";
            ctx.fillText(this.layout.title, this.margins.l + this.plotWidth / 2, 15);
        }
    }

    private drawData() {
        const { ctx } = this.renderer;

        // Clip to plotting area
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.margins.l, this.margins.t, this.plotWidth, this.plotHeight);
        ctx.clip();

        for (const trace of this.data) {
            const isLines = trace.mode?.includes('lines');
            const isMarkers = trace.mode === undefined || trace.mode?.includes('markers');
            
            const color = Array.isArray(trace.marker?.color) ? trace.marker.color[0] : (trace.marker?.color || '#1f77b4');
            const size = Array.isArray(trace.marker?.size) ? trace.marker.size[0] : (trace.marker?.size || 6);

            ctx.strokeStyle = color as string;
            ctx.fillStyle = color as string;

            if (isLines) {
                ctx.beginPath();
                for (let i = 0; i < trace.x.length; i++) {
                    const x = this.mapX(trace.x[i]);
                    const y = this.mapY(trace.y[i]);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            if (isMarkers) {
                for (let i = 0; i < trace.x.length; i++) {
                    const x = this.mapX(trace.x[i]);
                    const y = this.mapY(trace.y[i]);
                    
                    // Support array of colors/sizes
                    const ptColor = Array.isArray(trace.marker?.color) ? trace.marker.color[i] : color;
                    const ptSize = Array.isArray(trace.marker?.size) ? trace.marker.size[i] : size;
                    
                    ctx.fillStyle = ptColor as string;
                    ctx.beginPath();
                    ctx.arc(x, y, (ptSize as number) / 2, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }
        ctx.restore();
    }
}
