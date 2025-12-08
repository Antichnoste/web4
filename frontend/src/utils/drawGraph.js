export const drawGraph = (canvas, r, points) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Очистка и белый фон
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    const padding = 20;
    const xAxisY = height / 2;
    const yAxisX = width / 2;
    const scaleR = r > 0 ? r : 5;
    const pixelsPerUnit = (width / 2 - padding) / (scaleR * 1.5);

    // --- Фигуры (синие) ---
    ctx.fillStyle = '#3b82f6'; // Стандартный синий

    if (r > 0) {
        // Прямоугольник (2-я четверть)
        ctx.fillRect(
            yAxisX - r * pixelsPerUnit,
            xAxisY - r * pixelsPerUnit,
            r * pixelsPerUnit,
            r * pixelsPerUnit
        );

        // Треугольник (1-я четверть)
        ctx.beginPath();
        ctx.moveTo(yAxisX, xAxisY);
        ctx.lineTo(yAxisX + (r / 2) * pixelsPerUnit, xAxisY);
        ctx.lineTo(yAxisX, xAxisY - (r / 2) * pixelsPerUnit);
        ctx.fill();

        // Сектор (3-я четверть)
        ctx.beginPath();
        ctx.moveTo(yAxisX, xAxisY);
        ctx.arc(yAxisX, xAxisY, (r / 2) * pixelsPerUnit, 0.5 * Math.PI, Math.PI);
        ctx.fill();
    }

    // --- Оси (черные) ---
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // Ось X
    ctx.beginPath();
    ctx.moveTo(padding, xAxisY);
    ctx.lineTo(width - padding, xAxisY);
    ctx.stroke();

    // Ось Y
    ctx.beginPath();
    ctx.moveTo(yAxisX, height - padding);
    ctx.lineTo(yAxisX, padding);
    ctx.stroke();

    // Текст
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.fillText('X', width - padding + 5, xAxisY + 5);
    ctx.fillText('Y', yAxisX + 5, padding - 5);

    // --- Метки ---
    if (r > 0) {
        const labels = [
            { val: r, label: 'R' },
            { val: r / 2, label: 'R/2' },
            { val: -r / 2, label: '-R/2' },
            { val: -r, label: '-R' }
        ];

        labels.forEach(mark => {
            const x = yAxisX + mark.val * pixelsPerUnit;
            ctx.beginPath();
            ctx.moveTo(x, xAxisY - 5);
            ctx.lineTo(x, xAxisY + 5);
            ctx.stroke();
            ctx.fillText(mark.label, x - 10, xAxisY + 20);

            const y = xAxisY - mark.val * pixelsPerUnit;
            ctx.beginPath();
            ctx.moveTo(yAxisX - 5, y);
            ctx.lineTo(yAxisX + 5, y);
            ctx.stroke();
            ctx.fillText(mark.label, yAxisX + 10, y + 5);
        });
    }

    // --- Точки ---
    points.forEach(point => {
        const x = yAxisX + point.x * pixelsPerUnit;
        const y = xAxisY - point.y * pixelsPerUnit;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);

        ctx.fillStyle = point.hit ? '#22c55e' : '#ef4444';
        ctx.fill();

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
};