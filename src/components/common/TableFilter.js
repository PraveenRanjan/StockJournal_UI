import React, { useState, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { OPERATOR_EQUAL, OPERATOR_EQUAL_GRATER, OPERATOR_EQUAL_LESS } from '../Constants'

const operators = [OPERATOR_EQUAL, OPERATOR_EQUAL_GRATER, OPERATOR_EQUAL_LESS];

export default function TableFilter(props) {
    const { filterOptions, applyFilter } = props;

    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedOperator, setSelectedOperator] = useState(OPERATOR_EQUAL);
    const [value, setValue] = useState('');





    const handleChange = (event, fieldName) => {
        // console.log('handleChange --> ', fieldName, event.target.value);
        if ("selectedColumn" == fieldName) {
            setSelectedColumn(event.target.value);
        } else if ("selectedOperator" == fieldName) {
            setSelectedOperator(event.target.value);
        } else if ("value" == fieldName) {
            setValue(event.target.value);
        }
    }

    const handleSubmit = () => {
        applyFilter({ selectedColumn, selectedOperator, value })

    }


    return (
        <Box sx={{ border: '1px solid rgb(231, 235, 240)', borderRadius: '10px' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Column</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedColumn}
                    label="Column"
                    onChange={(e) => handleChange(e, 'selectedColumn')}
                    size="small"
                >
                    {filterOptions?.map(option => {
                        return <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                    }
                    )}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Operator</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOperator}
                    label="Age"
                    onChange={(e) => handleChange(e, 'selectedOperator')}
                >

                    <MenuItem value={OPERATOR_EQUAL}>eq</MenuItem>
                    <MenuItem value={OPERATOR_EQUAL_GRATER}>gt&eq</MenuItem>
                    <MenuItem value={OPERATOR_EQUAL_LESS}>lt&eq</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <TextField id="outlined-basic" label="Value"
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={(e) => handleChange(e, 'value')} />

            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Button variant="contained" size="small" onClick={handleSubmit}>Apply</Button>
            </FormControl>

        </Box>


    );
}