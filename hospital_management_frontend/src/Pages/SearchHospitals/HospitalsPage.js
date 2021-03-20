import React, {Component} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CssTextField from "../../Components/TextField/TextField";
import Grid from "@material-ui/core/Grid";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
import GoogleMapsComponent from "../../Components/GoogleMapsComponent/GoogleMapsComponent";


const center = {
    lat: 19.213561520048078,
    lng: 72.85285884065537
};


class HospitalsPage extends Component {
    state = {
        address: null,
        latitude:null,
        longitude:null
    };

    handleChange = address => {
        this.setState({address});
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    latitude:latLng.lat,
                    longitude:latLng.lng
                })
                console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (<>
                {console.log(this.state.latitude)}
                <div style={{
                    margin: 20,
                    zIndex:"10"
                }}>
                    <Paper component="form" className={{
                        padding: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 400,
                    }}>
                        <IconButton className={{
                            padding: 10,
                        }} aria-label="menu">
                            <SearchIcon/>
                        </IconButton>

                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                <>
                                    <InputBase
                                        value={this.state.address}
                                        className={{
                                            marginLeft: "5px",
                                            flexGrow: 1,
                                        }}

                                        {...getInputProps({
                                            placeholder: 'Search Google Maps ...',
                                            className: 'location-search-input',
                                        })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                                : {backgroundColor: '#ffffff', cursor: 'pointer'};
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </PlacesAutocomplete>
                    </Paper>
                </div>
               <GoogleMapsComponent latitude={this.state.latitude} longitude={this.state.longitude}/>
            </>
        );
    }
}

export default HospitalsPage;


