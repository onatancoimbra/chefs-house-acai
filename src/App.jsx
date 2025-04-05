import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaIceCream } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  // 1. Estados para armazenar seleções
  const [tamanho, setTamanho] = useState('300ml');
  const [frutas, setFrutas] = useState([]);
  const [adicionais, setAdicionais] = useState([]);

  // 2. Cálculo do preço (adaptado do seu JS original)
  const calcularTotal = () => {
    const precos = { '300ml': 12, '500ml': 18, '700ml': 24 };
    const totalFrutas = frutas.length * 2;
    const totalAdicionais = adicionais.length * 3;
    return precos[tamanho] + totalFrutas + totalAdicionais;
  };

  // 3. Função para lidar com checkboxes
  const toggleItem = (item, lista, setLista) => {
    if (lista.includes(item)) {
      setLista(lista.filter(i => i !== item));
    } else {
      setLista([...lista, item]);
    }
  };

  const gerarPedido = () => {
    const total = calcularTotal();
    const telefone = "5519981755678";

    const mensagem = `*PEDIDO DE AÇAÍ PREMIUM*%0A%0ATamanho: ${tamanho}%0A%0AAdicionais:%0A${frutas.concat(adicionais).map(item => `- ${item}`).join('%0A')
      }%0A%0ATotal: R$ ${total.toFixed(2).replace('.', ',')}`;

    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
  };

  return (
    <div className="app">
      <div className="card-custom">
        <h1 className="mb-4 text-center">🍨 Chefs House Açai</h1>

        {/* Seção Tamanho */}
        <div className="mb-4">
          <h2 className="section-title">Tamanho do copo</h2>
          <select
            id="tamanho"
            className="form-select"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
          >
            <option value="300ml">300ml - R$ 12,00</option>
            <option value="500ml">500ml - R$ 18,00</option>
            <option value="700ml">700ml - R$ 24,00</option>
          </select>
        </div>

        {/* Seção Frutas */}
        <div className="mb-4">
          <h2 className="section-title">Frutas <span className="text-muted fw-normal fs-6">+ R$ 2,00 cada</span></h2>
          <div className="row">
            <div className="col-6">
              {['Banana', 'Morango', 'Kiwi'].map((fruta) => (
                <div key={fruta} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={fruta.toLowerCase()}
                    checked={frutas.includes(fruta)}
                    onChange={() => toggleItem(fruta, frutas, setFrutas)}
                  />
                  <label className="form-check-label" htmlFor={fruta.toLowerCase()}>
                    {fruta}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="section-title">Adicionais <span className="text-muted fw-normal fs-6">+ R$ 3,00 cada</span></h2>
          <div className="row">
            <div className="col-6">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Leite Condensado" id="leite" />
                <label className="form-check-label" htmlFor="leite">Leite Condensado</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Granola" id="granola" />
                <label className="form-check-label" htmlFor="granola">Granola</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Paçoca" id="pacoca" />
                <label className="form-check-label" htmlFor="pacoca">Paçoca</label>
              </div>
            </div>
          </div>
        </div>

        <button onClick={gerarPedido} className="btn btn-primary w-100">Finalizar Pedido</button>

        <div id="resumo"></div>
      </div>
    </div>
  );
}

export default App
