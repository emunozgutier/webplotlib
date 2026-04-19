import { Trace, Layout } from "./types";
import { Plot } from "./Plot";

export function newPlot(
    target: string | HTMLElement, 
    data: Trace[], 
    layout?: Layout
): Plot {
    let container: HTMLElement | null = null;
    
    if (typeof target === 'string') {
        container = document.getElementById(target);
    } else {
        container = target;
    }

    if (!container) {
        throw new Error(`webplotlib: Could not find container element`);
    }

    // Clear the container before drawing to mimic Plotly.newPlot
    container.innerHTML = '';
    
    // Create new Plot instance
    return new Plot(container, data, layout);
}

// Re-export types
export * from "./types";
export * from "./Plot";
export * from "./Renderer";
export * from "./PlotComponents/ConfigPopUp";
export * from "./PlotComponents/EditableArea";
export * from "./PlotComponents/EditableComponents/Title";
export * from "./PlotComponents/EditableComponents/TitleConfig";
export * from "./PlotComponents/EditableComponents/Axis";
export * from "./PlotComponents/EditableComponents/AxisConfig";
