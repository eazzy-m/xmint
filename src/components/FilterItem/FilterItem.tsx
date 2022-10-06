
import React, {useState, useEffect} from 'react';
import { FormGroup, FormControlLabel, Checkbox, TextField, Button} from '@mui/material';
import { IBrands } from '../../interfaces/IBrands';
import { IAthlete } from '../../interfaces/IAthletes';
import { IPlaces } from '../../interfaces/IPlaces';
import {expandButtonStyle, formGroupStylesExpand, formGroupStylesShrink} from "./FilterItemStyleConstans";


const FilterItem = (props: {checkboxes: IBrands[] | IPlaces[] | IAthlete[], title: string, listOfLabels: string[]
                            fillFilters: (title: string, filters: string[], filtersLabels: string[]) => void,}) => {

    const {checkboxes, title, fillFilters, listOfLabels} = props;
    const [filters, setFilters] = useState<string[]>([]);
    const [filtersLabels, setFiltersLabels] = useState<string[]>([]);
    const [refFilters, setRefFilters] = useState<string[]>([])
    const [isShrink, setIsShrink] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const valueProvider = (elem: IBrands | IPlaces | IAthlete): string | number | undefined => {
        return (title === 'athletes' || title === 'brands') ? elem.id : elem.name;
    };

    const toggleFilter = (checked: boolean, filtersName: string, label: string): void => {
        if (!checked) {
           const updatedFilters = filters.filter(filtersNameItem => filtersNameItem !== filtersName); 
           const updatetLabels = filtersLabels.filter(filtersLabel => filtersLabel !== label); 
           setFilters(updatedFilters);
           setFiltersLabels(updatetLabels)
        } else {
            setFilters([...filters, filtersName]);
            setFiltersLabels([...filtersLabels, label])
        } 
        if (listOfLabels.includes(label) && filtersLabels.includes(label)) {
            setRefFilters([...refFilters, label])
        } else {
            const updatetLabels = refFilters.filter(refFilter => refFilter !== label); 
            setRefFilters(updatetLabels)
        }

    };
    
    const handleCheck = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const {value, checked, id} = evt.target;        
        toggleFilter(checked, value, id);
        console.log(filtersLabels.some(item => listOfLabels.includes(item)));
        
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = evt.target;
        setSearchTerm(value);
    };

    const handleClick = (): void => {
        setIsShrink(!isShrink);
    };

    useEffect(() => {
        fillFilters(title, filters, filtersLabels);

    }, [filters.length]);

    const typeChecker = (checkedItem: IBrands | IPlaces | IAthlete): string  => {
        return title === 'athletes' ? checkedItem.full_name + '' : checkedItem.name + '';
    };

    //filtersLabels.some(item => listOfLabels.includes(item))
  
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
                    <Checkbox checked={listOfLabels.includes(typeChecker(elem)) && filtersLabels.includes(typeChecker(elem))} onChange={handleCheck} value={valueProvider(elem)} id={typeChecker(elem)}/>
                        }
            />
        )}
    </FormGroup>
     {checkboxes.length > 9 && <Button sx={expandButtonStyle} onClick={handleClick}>{isShrink ? 'Show more' : 'Show less'}</Button>}
     </>
  );
};

export default FilterItem;