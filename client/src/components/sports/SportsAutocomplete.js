import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SportsAutocomplete = (props) => {
  // console.log(Object.keys(sports).length != 0 ? Object.values(sports).map(object => object.name).map((element) => {return {"label": element}}) : []);
  const defaultProps = {
    options: props.options,
    getOptionLabel: (option) => option.name
  };

  const handleChange = (e, newValue) => {
    props.onChange(newValue);
  };

  return (
    // <TextInput options={Object.keys(sports).length != 0 ? Object.values(sports).map(object => object.name) : []} />
    <Autocomplete
      {...defaultProps}
      value={props.value || null}
      defaultValue={null}
      onChange={handleChange}
      disablePortal
      className="form-group"
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};

SportsAutocomplete.propTypes = {
  sportChanged: PropTypes.func
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(SportsAutocomplete);
