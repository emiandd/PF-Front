import s from '../../css/FiltersAmount.module.css'
import FilterCard from './FilterCard'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useEffect } from 'react'
import { resetFilterCard } from '../../redux/actions'

const FiltersAmount = () => {
  const active = useSelector(state => state.filterActive)
  const dispatch = useDispatch()

  useEffect(() => {
    
    return () => {
      dispatch(resetFilterCard())
    }
  }, [dispatch])
  
  

  return (
    <div className={s.filterAmountBox}>
      <div className={s.filtersCardsBox}>
        {
          active && active.map((e, index)=>{
            return <FilterCard key={`id_${index}${e}`} type={e}/>
          })
        }
      </div>
    </div>
  )
}

export default FiltersAmount