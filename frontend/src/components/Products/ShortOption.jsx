import React from 'react'
import { useSearchParams } from 'react-router-dom'


const ShortOption = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  //const navigate = useNavigate();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set('sortBy', sortBy);
    setSearchParams(searchParams);
    //navigate(`?${searchParams.toString()}`);

  }


  return (
    <div className='mb-4 flex items-center justify-end'>
      <select
        id='sort'
        name='sort'
        onChange={handleSortChange}
        vakue={searchParams.get('sortBy') || ''}
        className='border p2 rounded-md focus:outline-none'
      >

          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default ShortOption
