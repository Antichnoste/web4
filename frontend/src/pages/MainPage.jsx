import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoints, addPoint, clearPoints } from '../store/pointsSlice';
import Graph from '../components/Graph';
import ResultsTable from '../components/ResultsTable';
import { validateY } from '../utils/validation';
import './Pages.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.points.items);

  const [x, setX] = useState(0);
  const [y, setY] = useState('');
  const [r, setR] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const xOptions = [-5, -4, -3, -2, -1, 0, 1, 2, 3];

  const rOptions = [-5, -4, -3, -2, -1, 0, 1, 2, 3];

  useEffect(() => {
    dispatch(fetchPoints());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateY(y)) {
      setErrorMsg('Y должен быть числом от -3 до 5');
      return;
    }
    setErrorMsg('');
    dispatch(addPoint({ x: Number(x), y: parseFloat(y), r: Number(r) }));
  };

  const handleGraphClick = (xGraph, yGraph) => {
    dispatch(addPoint({
      x: xGraph.toFixed(4),
      y: yGraph.toFixed(4),
      r: Number(r)
    }));
  };

  const handleClear = () => {
    dispatch(clearPoints());
  }

  return (
      <div className="main-page-centered">

        <div className="graph-section">
          <Graph r={Number(r)} points={points} onGraphClick={handleGraphClick} />
        </div>

        <form className="coord-form-new" onSubmit={handleSubmit}>
          {/* ВЕРХНИЙ РЯД: Поля ввода */}
          <div className="form-row">

            <div className="input-group">
              <label>X:</label>
              <select value={x} onChange={(e) => setX(e.target.value)}>
                {xOptions.map(val => (
                    <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Y:</label>
              <input
                  type="text"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                  placeholder="(-3...5)"
                  className="input-y"
              />
            </div>

            <div className="input-group">
              <label>R:</label>
              <div className="radio-group-container">
                {rOptions.map(val => (
                    <label key={val} className="radio-label">
                      <input
                          type="radio"
                          value={val}
                          checked={Number(r) === val}
                          onChange={(e) => setR(e.target.value)}
                      />
                      {val}
                    </label>
                ))}
              </div>
            </div>

          </div>

          {/* Сообщение об ошибке (по центру между полями и кнопками) */}
          {errorMsg && <div className="error-msg-center">{errorMsg}</div>}

          {/* НИЖНИЙ РЯД: Кнопки */}
          <div className="form-actions">
            <button type="submit" className="btn-submit">Проверить</button>
            <button type="button" className="btn-clear" onClick={handleClear}>Очистить</button>
          </div>
        </form>

        <div className="table-section">
          <ResultsTable points={points} />
        </div>
      </div>
  );
};

export default MainPage;