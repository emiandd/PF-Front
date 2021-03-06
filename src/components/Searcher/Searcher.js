import NavBar from '../../assets/NavBar/NavBar'
import MatchTest from './MatchTest'
import SearchCase from './SearchCase'
import Footer from '../../assets/Footer/Footer'
import s from '../../css/Searcher.module.css'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllPets, typeFilter, cityFilter, resetSearch } from '../../redux/petsActions'

const Searcher = () => {

  const { type, item, subItem } = useParams();
  const userId = localStorage.getItem('userId');
  const location = {locationType:item, value: subItem}
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPets())
  }, [dispatch])
  
  useEffect(() => {
    return () => {
      dispatch(resetSearch())
    }
  }, [dispatch, type])

  useEffect(() => {
    let petType = item === 'dog' ? "perro" : 'gato'
    if (type === 'pet') {
      if(item === 'dog'){
        dispatch(typeFilter({petType, userId}))
      } else if (item === 'cat'){
        dispatch(typeFilter({petType, userId}))
      } else if(item !== 'dog' && item !=='cat'){
        navigate('/')
      }
    }
    if(type === 'location'){
      if(userId){
        dispatch(cityFilter(location, userId))
      }else {
        dispatch(cityFilter(location))
      }
    }
  }, [dispatch, navigate, type, item])

  return (
    <main className={s.searcherBox}>
      <NavBar />
      <MatchTest />
      <SearchCase  petType={item} type={type} />
      <Footer />
    </main>
  )
}

export default Searcher