
import {useState, useEffect, ChangeEvent} from 'react';
import { FormGroup, FormControlLabel, Checkbox, TextField, Button} from '@mui/material';
import { IBrands } from '../../interfaces/IBrands';
import { IAthlete } from '../../interfaces/IAthletes';
import { IPlaces } from '../../interfaces/IPlaces';
import { IFilter } from '../../interfaces/IFilter';
import {expandButtonStyle, formGroupStylesExpand, formGroupStylesShrink} from "./FilterItemStyleConstans";


const FilterItem = (props: {checkboxes: IBrands[] | IPlaces[] | IAthlete[], title: string, listOfLabels: IFilter[], clear: boolean
                            fillFilters: (title: string, filters: string[], filtersLabels: IFilter[], toggledFitler: IFilter) => void, removedFilter: IFilter}) => {

    const {checkboxes, title, fillFilters, listOfLabels, clear, removedFilter} = props;
    const [filters, setFilters] = useState<string[]>([]);
    const [filtersData, setFiltersData] = useState<IFilter[]>([{label: '', data: '', categoryName: ''}]);
    const [filtersLabels, setFiltersLabels] = useState<string[]>(['']);
    const [isShrink, setIsShrink] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [toggled, setToggled] = useState<IFilter>({label: '', data: '', categoryName: ''});

    const valueProvider = (elem: IBrands | IPlaces | IAthlete): string | number | undefined => {
        return (title === 'athletes' || title === 'brands') ? elem.id : elem.name;
    };

    const toggleFilter = (checked: boolean, data: string, element: IFilter): void => {
        if (!checked) {
           const updatedFilters = filters.filter(filtersNameItem => filtersNameItem !== data); 
           const updatedData = filtersData.filter(filtersLabel => filtersLabel.label !== element.label); 
           const updatedLabelsList = updatedData.map(item => item.label);
           setFilters(updatedFilters);
           setFiltersData(updatedData);
           setFiltersLabels(updatedLabelsList);
        } else {
            setFilters([...filters, data]);
            setFiltersData([...filtersData, element]);
            setFiltersLabels([...filtersLabels, element.label]);
        }
    };
    
    
    const handleCheck = (evt: ChangeEvent<HTMLInputElement>): void => {
        const {value, checked, id} = evt.target;   
        const info = {label: id, data: value, categoryName: title};
        toggleFilter(checked, value, info);
        setToggled(info)
    };
    
    const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const {value} = evt.target;
        setSearchTerm(value);
    };

    const handleClick = (): void => {
        setIsShrink(!isShrink);
    };

    useEffect(() => {
        toggleFilter(false, removedFilter.data, removedFilter);
        setToggled(removedFilter);
    }, [removedFilter.data]);

    useEffect(() => {
        if(!clear) {
            setFiltersData([]);
            setFilters([]);
            setFiltersLabels([]);
        }

    }, [clear]);

    useEffect(() => {
        fillFilters(title, filters, filtersData, toggled); 
    }, [filters.length]);

    const typeChecker = (checkedItem: IBrands | IPlaces | IAthlete): string  => {
        return title === 'athletes' ? checkedItem.full_name + '' : checkedItem.name + '';
    };


  return (
    <>
        <FormGroup sx={(checkboxes.length > 9 && isShrink) ? formGroupStylesShrink : formGroupStylesExpand}>
            {checkboxes.length > 15  && 
            <TextField size="small" hiddenLabel id="outlined-basic" placeholder="Search" variant="outlined" sx={{width: "271px"}} onChange={handleChange}/>}
            {checkboxes.filter((value) => {
                                if (searchTerm === "") {
                                    return value
                                } else if (typeChecker(value).toLowerCase().includes(searchTerm.trim().toLowerCase())) {
                                    return value
                                } return null
                            }).map((elem, index) => 
                <FormControlLabel
                    label={title === 'athletes' ? elem.full_name : elem.name}
                    key={index}
                    control={
                        <Checkbox checked={listOfLabels.map(item => item.label).includes((typeChecker(elem)))} onChange={handleCheck} value={valueProvider(elem)} id={typeChecker(elem)}/>
                            }
                />
            )}
        </FormGroup>
     {checkboxes.length > 9 && <Button sx={expandButtonStyle} onClick={handleClick}>{isShrink ? 'Show more' : 'Show less'}</Button>}
     </>
  );
};

export default FilterItem;