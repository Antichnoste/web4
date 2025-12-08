import React from 'react';

const ResultsTable = ({ points }) => {

  // Функция для красивого вывода времени выполнения
  const formatExecTime = (ns) => {
    // Проверка, если пришел null или undefined
    if (ns === undefined || ns === null) return '—';

    // Если очень маленькое число (меньше 1 мс), показываем в мкс
    if (ns < 1000000) {
      return `${(ns / 1000).toFixed(0)} мкс`;
    }
    // Иначе в мс
    return `${(ns / 1000000).toFixed(2)} мс`;
  };

  return (
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
            <th>Время скрипта</th>
            <th>Дата и время</th>
          </tr>
          </thead>
          <tbody>
          {[...points].reverse().map((p) => (
              <tr key={p.id || Math.random()}>
                <td>{p.id}</td>
                <td>{Number(p.x).toFixed(3)}</td>
                <td>{Number(p.y).toFixed(3)}</td>
                <td>{p.r}</td>
                {/* Используем поле hit для класса и текста */}
                <td className={p.hit ? 'hit' : 'miss'}>
                  {p.hit ? 'Попал' : 'Промах'}
                </td>
                {/* Используем executionTimeNs */}
                <td>{formatExecTime(p.executionTimeNs)}</td>
                <td>
                  {p.createdAt
                      ? new Date(p.createdAt).toLocaleTimeString('ru-RU', { hour12: false })
                      : '—'}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default ResultsTable;