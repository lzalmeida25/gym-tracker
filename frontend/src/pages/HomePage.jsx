import { Link } from 'react-router-dom'

const summaryItems = [
  { value: '0', label: 'exercícios', to: '/exercicios' },
  { value: '0', label: 'fichas', to: '/fichas' },
  { value: '0', label: 'treinos concluídos', to: '/historico' },
]

function HomePage() {
  return (
    <main className="dashboard">
      <section className="page-heading" aria-labelledby="page-title">
        <p className="eyebrow">Visão geral</p>
        <h1 id="page-title">Seu treino começa aqui.</h1>
        <p className="page-description">
          Organize sua rotina e acompanhe cargas e repetições em um só lugar.
        </p>
      </section>

      <section className="workout-card" aria-labelledby="today-title">
        <div className="workout-card__header">
          <div>
            <p className="card-label">Treino de hoje</p>
            <h2 id="today-title">Nenhum treino em andamento</h2>
          </div>
          <span className="status-indicator" aria-label="Sem treino ativo">
            <span aria-hidden="true" />
            Em repouso
          </span>
        </div>

        <p className="workout-card__description">
          Quando você iniciar uma ficha, seu progresso aparecerá nesta área.
        </p>

        <button
          className="primary-action"
          type="button"
          disabled
          title="Disponível em uma próxima etapa"
        >
          Iniciar treino
        </button>
      </section>

      <section className="summary" aria-labelledby="summary-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sua rotina</p>
            <h2 id="summary-title">Resumo</h2>
          </div>
          <p>Os números serão atualizados conforme você usar o aplicativo.</p>
        </div>

        <div className="summary-grid">
          {summaryItems.map((item) => (
            <Link className="summary-card" key={item.label} to={item.to}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <span className="summary-card__action">
                Abrir <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
