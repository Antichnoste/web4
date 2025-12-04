import React, { useState } from "react";
import axios from "axios";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  const callApi = async (operation) => {
    const url = `http://localhost:8080/api/calc/${operation}`;
    const response = await axios.get(url, { params: { a, b } });
    setResult(response.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Калькулятор (React + Spring)</h1>

      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="Введите A"
      />

      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        placeholder="Введите B"
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={() => callApi("add")}>+</button>
        <button onClick={() => callApi("subtract")}>-</button>
        <button onClick={() => callApi("multiply")}>*</button>
        <button onClick={() => callApi("divide")}>/</button>
      </div>

      <h2>Результат: {result !== null ? result : "—"}</h2>
    </div>
  );
}

export default App;
