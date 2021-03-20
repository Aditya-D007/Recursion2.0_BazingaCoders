import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Marker } from '@react-google-maps/api';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import GoogleMapsComponent from "../../Components/GoogleMapsComponent/GoogleMapsComponent";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress , getLatLng} from 'react-google-places-autocomplete';
const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 0,
    lng: -180
}



class HospitalsPage extends Component {
    state = {
        address: null,
        lat:null,
        lng:null,
        position :{
            lat: 37.772,
            lng: -122.214
        }
    };

    handleChange = address => {
        console.log("This Address",address)

        geocodeByAddress(address.label)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>{
                    this.setState({ lat:lat,
                        lng:lng})
                    console.log('Successfully got latitude and longitude', { lat, lng })
            });
        this.setState({address});
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

                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyBRQW7pWPvMmdYbj3Mc_4YVA1tt8k4oIpY"
                            selectProps={{

                                onChange:this.handleChange ,
                            }}
                        />
                    </Paper>
                </div>

               <GoogleMapsComponent latitude={this.state.lat} longitude={this.state.lng}/>
            </>
        );
    }
}

export default HospitalsPage;


