let internalCanvas: HTMLCanvasElement | null;

export function setCanvas(canvas: HTMLCanvasElement | null) {
    internalCanvas = canvas;
}

export default function render() {
    if (!internalCanvas) { return; }

    const context = internalCanvas.getContext('2d');
    if (!context) { return; }

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 1)';
    }
    const color = random_rgba();

    context.fillStyle = color;
    context.fillRect(50, 50, 160, 144);
}
