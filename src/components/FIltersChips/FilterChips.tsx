import React from 'react'
import {Chip} from '@mui/material';

const FilterChips = (props: {filters: string[]}) => {

  const {filters} = props;
  

  return (
    <>
      {
        filters.map((filter, index) =>
          <Chip key={index} label={filter} onDelete={() => {}}/>
        )        
      }
    </>
  );
};

export default FilterChips;