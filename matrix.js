class MatrixEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrix-canvas';
        document.body.prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.fontSize = 16;
        this.columns = 0;
        this.drops = [];
        this.chars = '0123456789'; // Only numbers as requested
        
        this.init();
        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100; // Start at different heights
        }
    }

    draw() {
        // Trail effect - keep it dark
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            // "Poucos em poucos": only draw if a random check passes or if it's already falling
            // Actually, we'll just slow down the increment and keep them sparse
            
            const text = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            const relativeHeight = y / this.canvas.height;
            let opacity = 0.8; // Slightly more subtle
            
            if (relativeHeight > 0.6) {
                opacity = Math.max(0, 0.8 - (relativeHeight - 0.6) / 0.3);
            }

            if (relativeHeight < 0.1) {
                opacity = Math.min(opacity, relativeHeight / 0.1);
            }

            if (opacity > 0) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // White as requested
                this.ctx.fillText(text, x, y);
            }

            // Reset drop if it reaches the end or randomly for sparse effect
            if (y > this.canvas.height) {
                // To keep it sparse, don't reset immediately, but wait for a random chance
                if (Math.random() > 0.98) {
                    this.drops[i] = 0;
                }
            } else {
                // "Lentamente": slow increment
                this.drops[i] += 0.15; 
            }
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Start the effect
document.addEventListener('DOMContentLoaded', () => {
    const matrix = new MatrixEffect();
    matrix.animate();
});
