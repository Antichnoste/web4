import React, { useRef, useEffect } from 'react';
import { drawGraph } from '../utils/drawGraph';

const Graph = ({ r, points, onGraphClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    drawGraph(canvas, r, points);
  }, [r, points]);

  const handleClick = (e) => {
    if (r <= 0) {
      alert("Выберите R перед кликом по графику!");
      return;
    }

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const width = canvas.width;
    const height = canvas.height;

    const xClick = e.clientX - rect.left;
    const yClick = e.clientY - rect.top;

    // Логика пересчета масштабируется автоматически, т.к. зависит от width/height
    const scaleR = r;
    const padding = 20;
    const pixelsPerUnit = (width / 2 - padding) / (scaleR * 1.5);
    const centerX = width / 2;
    const centerY = height / 2;

    const xGraph = (xClick - centerX) / pixelsPerUnit;
    const yGraph = (centerY - yClick) / pixelsPerUnit;

    onGraphClick(xGraph, yGraph);
  };

  return (
      <div className="graph-container">
        <canvas
            ref={canvasRef}
            width={500}  /* Увеличили размер */
            height={500} /* Увеличили размер */
            onClick={handleClick}
            className="graph-canvas"
        />
      </div>
  );
};

export default Graph;