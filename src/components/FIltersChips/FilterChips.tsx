
import { Chip } from '@mui/material';
import { IFilter } from '../../interfaces/IFilter';

const FilterChips = (props: {filters: IFilter[], removeFilter: (filter: IFilter) => void}) => {

  const {filters, removeFilter} = props;
  
  return (
    <>
      {
        filters.map((filter, index) =>
          <Chip key={index} label={filter.label} onDelete={() => removeFilter(filter)}/>
        )        
      }
    </>
  );
};

export default FilterChips;