import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CssTextField from "../../../../Components/TextField/TextField";
import ColorButton from "../../../../Components/Button/Button";
import RegisterCss from './auth.module.css'
import * as actions from "../../../../store/actions/hospitalAuthActions";
import {connect} from "react-redux";
import {createMuiTheme} from "@material-ui/core";
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main:  "#0d335d"
        }
    },
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#0d335d"
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: lightBlue.A200,
                // color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: "#c1a1d3",
            },
            daySelected: {
                backgroundColor: "#c1a1d3",
            },
            dayDisabled: {
                color: "#0d335d"
            },
            current: {
                color: "#0d335d"
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: "#0d335d"
            },
        },
        MuiInputLabel:{
            root:{
                 color:"#fff3e6"
            },
            '& label.Mui-focused': {
            color: "#fff3e6",
            fontSize: "20px",
            marginTop: "-10px",
            fontFamily: "'Montserrat', sans-serif",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1a508b',

        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1a508b',
                fontSize: "20px",
            },
            '&:hover fieldset': {
                borderColor: '#1a508b',
                color: "#1a508b",
                fontSize: "20px",

                fontFamily: "'Montserrat', sans-serif",
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1a508b',
                color: "white"
            },
        },
        '& .MuiInputBase-input': {
            color: "#fff3e6",
            fontSize: "20px",
            fontFamily: "'Montserrat', sans-serif !important",
        },
        '& .MuiInput-input': {
            color: "#fff3e6",
            fontSize: "20px",
            fontFamily: "'Montserrat', sans-serif",
        },
        '& .MuiFormLabel-root.Mui-disabled': {
            color: "#fff3e6",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "25px",

        },
        '& .MuiInputLabel-root': {
            color: "#fff3e6",
            display: "block",
            transformOrigin: "top left",

        },

        },

    },
});


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.hospitalName = React.createRef();
        this.hospitalAddress = React.createRef();
        this.username = React.createRef();
        this.phoneno = React.createRef();
        this.state = { address: '' };
    }

    state = {
        isLogin: false,
        hospital_name: "GEM",
        address: "kandivali",
        phone_no: "8888888888",
        email_id: "genhospital@gmail.com",
        pass_word: "12345678",
        date: new Date(),
        latitude: null,
        longitude: null,
        gender: "male",
        message_for_email_taken: 'Enter Correct Email',
        modal:false

    };

    componentDidMount() {

    }


    closeModal = () =>{
        this.setState(
            {
                modal:false
            }
        )
    }

    handleChange = address => {
        this.setState({ address });

    };


    handleSelect = address => {

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { this.setState({
                latitude:latLng.lat,
                longitude:latLng.lng
            })})
            .catch(error => console.error('Error', error));

    };

    submitHandler = async(event) => {

        event.preventDefault();
        const email = this.emailEl.current.value;
        const hospitalName = this.hospitalName.current.value;
        const hospitalAddress = this.state.address;
        // const password1 = this.passworld1.current.value;
        const password = this.passwordEl.current.value;
        const Phone = Number(this.phoneno.current.value);
        const birth_date = this.state.date;
        const clinic_coordinates = [
            this.state.longitude,
            this.state.latitude,
          ];
        // const final_birth_date = birth_date.getFullYear() + "-" + birth_date.getMonth()+1 + "-" + birth_date.getDate();
        console.log(email, hospitalName, hospitalAddress, password, Phone)
        if (email && hospitalName && hospitalAddress && password && Phone !== "") {
            const Submitted = await this.props.onSubmitToRegister(hospitalName, email, Phone, password,String(hospitalAddress), clinic_coordinates)
                .then(data => {
                return data
            });
            console.log("SUBMITTED DATA", Submitted);


            if (Submitted.ERROR) {

                this.setState({message_for_email_taken: Submitted.ERROR})
                return;
            }
            if(Submitted.STATUS) {
                this.setState({
                    modal: true,

                })
            }
            const response = await fetch("http://localhost:4000/register/hospital", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "hospitalName": hospitalName,
                  "hospitalId": email,
                  "hospitalPhone": Phone,
                  "hospitalPassword": password,
                  "hospitalAddress": String(hospitalAddress),
                  "hospitalCoordinates": {
                    "type":"Point",
                    "coordinates":clinic_coordinates,
                  }
                }),
              },
            );


            const resData = await response.json();
            console.log(resData.errorMessage);
            if (resData.errorMessage !== undefined) {
              return resData.errorMessage;
            }
            return resData
        }


    }

    render() {
        return (
            <>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <div style={{
                        fontFamily: "'Montserrat', sans-serif",
                        marginTop:"100px"
                    }}>


                    </div>
                    <form className={RegisterCss.BackdropForm} onSubmit={this.submitHandler}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">
                            <h1 style={{
                                fontSize: "20px",
                                color: "#fff3e6",
                                marginTop: "30px",
                                // marginBottom:"-50px",
                                fontFamily: "'Montserrat', sans-serif",
                            }}>New Here?</h1>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="flex-start"
                            style={{
                                width: "100%",
                                marginTop: "10px"
                            }}

                        >
                            <CssTextField style={{
                                width: "40%",
                                marginTop: "5px",
                                fontFamily: "'Montserrat', sans-serif",

                            }} inputRef={this.hospitalName}
                                          value={this.state.hospital_name}
                                          onChange={event => this.setState({hospital_name: event.target.value})}

                                          label="Hospital Name"/>
                            <CssTextField style={{
                                width: "40%",
                                marginTop: "10px",
                                fontFamily: "'Montserrat', sans-serif",
                            }} type={"number"} inputRef={this.phoneno} label="Phone No"
                                          value={this.state.phone_no}
                                          onChange={event => this.setState({phone_no: event.target.value})}


                            />

                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="flex-start"
                            style={{
                                width: "100%",
                                marginTop: "10px"
                            }}

                        >
                            <CssTextField style={{
                                width: "40%",
                                marginTop: "10px",
                                fontFamily: "'Montserrat', sans-serif",
                            }} type={"email"} inputRef={this.emailEl} label="Email Id"

                                          value={this.state.email_id}
                                          onChange={event => this.setState({email_id: event.target.value})}


                            />
                            <CssTextField style={{
                                width: "40%",
                                marginTop: "10px",
                                fontFamily: "'Montserrat', sans-serif",
                            }}

                                          type={"password"}
                                          inputRef={this.passwordEl} label="Password"

                                          value={this.state.pass_word}
                                          onChange={event => this.setState({pass_word: event.target.value})}

                            />

                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="flex-start"
                            style={{
                                width: "100%",
                                marginTop: "10px"
                            }}

                        >


                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            >
                                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                    <div>
                                        <CssTextField style={{
                                            width: "100%",
                                            marginTop: "5px",
                                            fontFamily: "'Montserrat', sans-serif",
                                        }} {...getInputProps({
                                            placeholder: 'Hospital Address ...',
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
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">
                            <ColorButton style={{
                                marginTop: "20px",
                                border: "1px solid #fff3e6"
                            }} type="submit"> Sign Up!</ColorButton>
                        </Grid>
                    </form>

                </Grid>
                <div>

                    <Modal
                        isOpen={this.state.modal}
                        onRequestClose={this.closeModal}
                        className="Modal"
                        ariaHideApp={false}
                        style={{
                            backgroundColor: "transparent"
                        }}
                    >


                        <CloseIcon onClick={this.closeModal}/>
                        <div className="ModalDiv">

                            <p>
                                Registration Successfull
                            </p>

                        </div>

                    </Modal>
                </div>
            </>
        );

    }
}

const mapStateToProps = state => {

    return {
        isAuthenticated: state.token !== null,
        isAdmin: state.admin_priority,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitToRegister:(hospitalName, email, Phone, password,hospitalAddress, clinic_coordinates) => dispatch(actions.hospitalAuthSignup(hospitalName, email, Phone, password,hospitalAddress, clinic_coordinates))
    }
}
// export default (Authentication);
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
