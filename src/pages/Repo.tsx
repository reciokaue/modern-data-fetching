import { useQueryClient } from 'react-query'
import { useNavigate, useParams, useRoutes } from 'react-router-dom'

interface IRepository {
  full_name: string
  description: string
}

export function Repo() {
  const params = useParams()
  const currentRepository = params['*'] as string
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  async function handleChangeRepository(){
    //? Chamada API para atualizar descrição do repositorio

    //? \/ Pegando os dados da query 'repos' alterando e salvando novamente
    //?    para não utilizar outra requisição para atualizar os dados
    const previousRepos = queryClient.getQueryData<IRepository[]>('repos')
    if(previousRepos){
      const nextRepos = previousRepos.map(repo => {
        if(repo.full_name === currentRepository){
          return { ...repo, description: 'Testando'}
        }else {
          return repo
        }
      })

      queryClient.setQueryData('repos', nextRepos)
      navigate(-1)
    }
    // await queryClient.invalidateQueries(['repos'])
    //? Função para revalidar a proxima ação de FOCUS na pagina que faz query 'repos'
  }

  return (
    <div>
      <h1>Repository | {currentRepository}</h1>
      
      <button onClick={handleChangeRepository}>Change repository</button>
    </div>  
  )
}

