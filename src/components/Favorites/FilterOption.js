import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import s from '../../css/FilterOption.module.css'
import { 
  breedFilter, 
  ageFilter, 
  sizeFilter, 
  genreFilter, 
  environmentFilter,
  coatFilter,
  colorFilter,
  attributesFilter,
  daysFilter,
  shelterFilter,
} from '../../redux/petsActions'


const FilterOption = ({ type, options, setFilterType, filterType }) => {


  const dispatch = useDispatch()

  // setFilterType({
  //   ...filterType,
  //   [type]: false
  // })

  const onClickHandler = (e) => {
    setFilterType({...filterType, [type]: e.target.value})
    
    switch (type) {
      case 'Raza':
        e.target.value.length && dispatch(breedFilter(e.target.value))
        break;
      case 'Edad':
        e.target.value.length && dispatch(ageFilter(e.target.value))
        break
      case 'Tamaño':
        e.target.value.length && dispatch(sizeFilter(e.target.value.split(' ')[0]))
        break
      case 'Sexo':
        e.target.value.length && dispatch(genreFilter(e.target.value))
        break
      case 'Afinidad con':
        const environment = e.target.value === 'Kids' ? 'children' : e.target.value === 'Dogs' ? 'dogs' : 'cats'
        e.target.value.length && dispatch(environmentFilter(environment))
        break
      case 'Pelaje':
        e.target.value.length && dispatch(coatFilter(e.target.value))
        break
      case 'Color':
        e.target.value.length && dispatch(colorFilter(e.target.value))
        break
      case 'Cuidado y Comportamiento':
        const attributes = e.target.value === 'House-trained' ? 'house_trained' : e.target.value === 'Declawed' ? 'declawed' : 'special_needs'
        e.target.value.length && dispatch(attributesFilter(attributes))
        break
      case 'Tiempo en Adopción':
        e.target.value.length && dispatch(daysFilter(e.target.value))
        break
      case 'Refugios':
        e.target.value.length && dispatch(shelterFilter(e.target.value))
        break
      default:
        break;
    }
  }

  return (
    <div className={s.filterOptionBox}>
      <label htmlFor='select'>{type}</label>
      <select value='' name='select' onChange={onClickHandler}>
        <option value=""></option>
        {
          options.map(element => {
            return <option key={`${element}`} value={element}>{element}</option>
          })
        }
      </select>
    </div>
  )
}

export default FilterOption