import React from 'react';

function Pagination({ pageProp, goBack, goAhead }) {
  return (
    <div className='flex justify-center m-4'>
      <button onClick={goBack} className='p-2 border-2 border-gray-400 m-1 text-gray-700 rounded'>
        Previous
      </button>
      <div className='p-2 border-2 border-gray-400 m-1 text-gray-700 rounded'>
        {pageProp}
      </div>
      <button onClick={goAhead} className='p-2 border-2 border-gray-400 m-1 text-gray-700 rounded'>
        Next
      </button>
    </div>
  );
}

export default Pagination;
