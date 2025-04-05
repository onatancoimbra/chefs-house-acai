import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaIceCream } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const logo = `${import.meta.env.BASE_URL}chefs-house-acai-logo.png`;

  // 1. Estados para armazenar seleções
  const [tamanho, setTamanho] = useState('330ml');
  const [frutas, setFrutas] = useState([]);
  const [adicionais, setAdicionais] = useState([]);

  // 1.2 Array lista de frutas
  const listaTamanhos = [
    { nome: "330ml", preco: 11.95 },
    { nome: "550ml", preco: 15.95 },
    { nome: "770ml", preco: 19.95 },
  ];

  // 1.2 Array lista de frutas
  const listaFrutas = [
    { nome: "Banana", preco: 1.85 },
    { nome: "Morango", preco: 1.85 },
    { nome: "Uva", preco: 2.65 },
    { nome: "Kiwi", preco: 5.45 },
  ];

  // 1.3 Array lista de adicionais 
  const listaAdicionais = [
    { nome: "Leite condensado", preco: 1 },
    { nome: "Creme de avelã", preco: 3.75 },
    { nome: "Creme de leite Ninho", preco: 3.75 },
    { nome: "Chantilly", preco: 2.5 },
    { nome: "Ovomaltine Rocks", preco: 4 },
  ];

  // 2. Cálculo do preço (adaptado do seu JS original)
  const calcularTotal = () => {
    const precos = listaTamanhos
      .filter((item) => tamanho.includes(item.nome))
      .reduce((acc, item) => acc + item.preco, 0);

    const totalFrutas = listaFrutas
      .filter((item) => frutas.includes(item.nome))
      .reduce((acc, item) => acc + item.preco, 0);

    const totalAdicionais = listaAdicionais
      .filter((item) => adicionais.includes(item.nome))
      .reduce((acc, item) => acc + item.preco, 0);

    return precos + totalFrutas + totalAdicionais;
  };

  // 3. Função para lidar com checkboxes
  const toggleItem = (item, lista, setLista) => {
    if (!lista.includes(item) && lista.length >= 2) return;

    if (lista.includes(item)) {
      setLista(lista.filter(i => i !== item));
    } else {
      setLista([...lista, item]);
    }
  };

  const gerarPedido = () => {
    const total = calcularTotal();
    const telefone = "5519981755678";

    const msgFrutas = frutas.map(item => `- ${item}`).join('%0A');
    const msgAdicionais = adicionais.map(item => `- ${item}`).join('%0A');

    const mensagem = `*PEDIDO DE AÇAÍ DO CHEF*%0A%0ATamanho: ${tamanho}%0A%0AFrutas:%0A${msgFrutas}%0A%0AAdicionais:%0A${msgAdicionais}%0A%0ATotal: R$ ${total.toFixed(2).replace('.', ',')}`;

    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
  };

  return (
    <div className="app">
      <div className="card-custom">
        <div className="logo-banner">
          <img src={logo} alt="Logo" style={{ maxHeight: '80px' }} />
        </div>

        <div className="inside-card-custom">
          {/* Seção Tamanho */}
          <div className="mb-4">
            <h2 className="section-title">Tamanho do copo</h2>
            <select
              id="tamanho"
              className="form-select"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
            >
              {
                listaTamanhos.map((tamanho) => (
                  <option key={tamanho.nome} value={tamanho.nome}>{tamanho.nome} - R$ {tamanho.preco}</option>
                ))
              }

            </select>
          </div>

          {/* Seção Frutas */}
          <div className="mb-4">
            <h2 className="section-title">Frutas <span className="text-muted fw-normal fs-6">[adicionar limite de quantidade]</span></h2>
            <div className="d-flex flex-column">
              <div className="col-12">

                {listaFrutas.map((fruta) => (
                  <div key={fruta.nome} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={fruta.nome.toLowerCase()}
                      checked={frutas.includes(fruta.nome)}
                      onChange={() => toggleItem(fruta.nome, frutas, setFrutas)}
                    />
                    <label className="form-check-label" htmlFor={fruta.nome.toLowerCase()}>
                      {fruta.nome} - {fruta.preco.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="section-title">Adicionais <span className="text-muted fw-normal fs-6">[adicionar limite de quantidade]</span></h2>
            <div className="d-flex flex-column">
              <div className="col-12">

                {
                  listaAdicionais.map(
                    (item) => (
                      <div key={item.nome}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={item.nome}
                          checked={adicionais.includes(item.nome)}
                          onChange={() => toggleItem(item.nome, adicionais, setAdicionais)}
                        />
                        <label className="form-check-label" htmlFor={item.nome}>
                          {item.nome} - {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })}
                        </label>
                      </div>
                    )
                  )
                }

              </div>
            </div>
          </div>

          <button onClick={gerarPedido} className="btn-finalizar w-100">Finalizar Pedido</button>

          <div id="resumo"></div>
        </div>

      </div>
    </div>
  );
}

export default App
