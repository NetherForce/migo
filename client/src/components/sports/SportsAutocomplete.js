import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SportsAutocomplete = ({ sports, sportChanged }) => {
  // console.log(Object.keys(sports).length != 0 ? Object.values(sports).map(object => object.name).map((element) => {return {"label": element}}) : []);
  const options = sports
    ? Object.keys(sports).map((key) => {
        return { ...sports[key], id: key, key: key };
      })
    : [];
  options.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  let i = 0;
  while (i < options.length - 1) {
    if (options[i].name === options[i + 1].name) {
      options.splice(i + 1, 1);
    } else {
      i++;
    }
  }

  const [sport, setSport] = React.useState();
  // const clearSportInput = () => {
  //   setSport('');
  // }

  return (
    // <TextInput options={Object.keys(sports).length != 0 ? Object.values(sports).map(object => object.name) : []} />
    <Autocomplete
      value={sport}
      onChange={(event, newSport) => {
        setSport(newSport.name);
        sportChanged(newSport.id);
      }}
      disablePortal
      className="form-group"
      getOptionLabel={(sport) => sport.name}
      options={options}
      renderInput={(params) => <TextField {...params} label="Sport" />}
    />
  );
};

SportsAutocomplete.propTypes = {
  sports: PropTypes.object,
  sportChanged: PropTypes.func
};

const mapStateToProps = (state) => ({
  sports: state.staticData.sports
});

export default connect(mapStateToProps, { })(SportsAutocomplete);
