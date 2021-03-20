import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};
export class MapContainer extends Component {

    state = {
        mapCenter:{
            lat:19.121450985578914,
            long: 72.88014314938171
        }
    }


    componentDidMount() {
        console.log("Latitude",this.props.latitude,this.props.longitude)
    }



    render() {
        return (
            <div>


            <Map
            google={this.props.google}
            zoom={10}
            style={{
                width: '100%',
                height: '50%',

            }}
            initialCenter={{ lat: 19.121450985578914,
                lng:  72.88014314938171}}
        >


            <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{
                    lat: this.props.latitude !== null ? this.props.latitude :this.state.mapCenter.lat,
                    lng: this.props.longitude !== null ? this.props.longitude :this.state.mapCenter.long}} />
        </Map>
            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBRQW7pWPvMmdYbj3Mc_4YVA1tt8k4oIpY'
})(MapContainer);
