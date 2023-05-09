import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export interface IRepository {
  full_name: string
  description: string
}

export function Repos() {
  const {data: repos, isFetching } = useFetch<IRepository[]>({
    url: '/users/reciokaue/repos',
    id: 'repos',
  })

  return (
    <div className='flex p-10'>
      <h1>Repositories</h1>
      {isFetching && <p>Carregando...</p>}
      {repos?.map(repo => (
        <li className='ml-10' key={repo.full_name}>
          <Link to={`repos/${repo.full_name}`}>
            {repo.full_name}
          </Link>
          <p className='ml-10'>{repo.description}</p>
        </li>
      ))}
    </div>  
  )
}

