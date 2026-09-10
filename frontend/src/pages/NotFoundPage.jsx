import EmptyPage from '../components/EmptyPage.jsx'

function NotFoundPage() {
  return (
    <EmptyPage
      eyebrow="Página não encontrada"
      title="Este caminho não existe."
      description="Use o botão abaixo para retornar à página inicial."
    />
  )
}

export default NotFoundPage
