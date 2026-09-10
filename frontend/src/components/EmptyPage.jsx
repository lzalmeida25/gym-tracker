import { Link } from 'react-router-dom'

function EmptyPage({ eyebrow, title, description }) {
  return (
    <main className="empty-page">
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span>
        Voltar ao início
      </Link>

      <section className="empty-page__content" aria-labelledby="empty-page-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="empty-page-title">{title}</h1>
        <p>{description}</p>
        <span className="coming-soon">Disponível em uma próxima etapa</span>
      </section>
    </main>
  )
}

export default EmptyPage
