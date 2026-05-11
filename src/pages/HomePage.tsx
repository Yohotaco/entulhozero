import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="stack">
      <section className="hero">
        <div className="heroCard">
          <h1>Sobrou material? Anuncia. Alguém perto usa.</h1>
          <p className="muted">
            Um MVP pra conectar sobras de obra (tipo telha, tijolo, madeira) com pessoas que estão precisando —
            com prazo de expiração e chat.
          </p>
          <div className="row">
            <Link className="btn" to="/novo">
              Criar anúncio
            </Link>
            <Link className="btnSecondary" to="/explorar">
              Explorar anúncios
            </Link>
          </div>
        </div>
        <div className="heroStats">
          <div className="stat">
            <div className="statNum">Local</div>
            <div className="statLabel">Bairro / cidade</div>
          </div>
          <div className="stat">
            <div className="statNum">Prazo</div>
            <div className="statLabel">Expira sozinho</div>
          </div>
          <div className="stat">
            <div className="statNum">Chat</div>
            <div className="statLabel">Combina retirada</div>
          </div>
        </div>
      </section>

      <section className="grid2">
        <div className="card">
          <h2>Como funciona</h2>
          <ol className="list">
            <li>Você cria um anúncio com prazo (ex.: 3 dias).</li>
            <li>Quem tiver interesse manda mensagem no chat.</li>
            <li>Vocês combinam retirada. Simples.</li>
          </ol>
        </div>
        <div className="card">
          <h2>Por que isso é bom pra ciência</h2>
          <ul className="list">
            <li>Reduz descarte desnecessário.</li>
            <li>Mostra economia circular no bairro.</li>
            <li>Permite simular dados e medir “reaproveitamento”.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

