import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CssTextField from "../../../../Components/TextField/TextField";
import ColorButton from "../../../../Components/Button/Button";
import Typography from '@material-ui/core/Typography';
import RegisterCss from './auth.module.css'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomRadioButton from "../../../../Components/RadioButton/RadioButton";
import * as actions from "../../../../store/actions/patientAuthActions";
import {connect} from "react-redux";
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';

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
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.username = React.createRef();
        this.phoneno = React.createRef();
    }

    state = {
        isLogin: false,
        first_name: "Reuben",
        last_name: "Coutinho",
        phone_no: "7021597154",
        email_id: "reuben211999@gmail.com",
        pass_word: "Reuben@21",
        date: new Date(),
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

    submitHandler = async (event) => {

        event.preventDefault();
        const email = this.emailEl.current.value;
        const firstname = this.firstName.current.value;
        const lastname = this.lastName.current.value;
        // const password1 = this.passworld1.current.value;
        const password = this.passwordEl.current.value;
        const Phone = Number(this.phoneno.current.value);
        const Gender = this.state.gender;
        const birth_date = this.state.date.toISOString();
        // const final_birth_date = birth_date.getFullYear() + "-" + birth_date.getMonth()+1 + "-" + birth_date.getDate();
        console.log(email, firstname, lastname, password,
            Phone, Gender, birth_date

            )
        if (email && firstname && lastname && password && Phone !== "") {
            const Submitted = await this.props.onSubmitToRegister(firstname, lastname, email, password, birth_date, Phone, Gender)
                .then(data => {
                return data
            });
            console.log("SUBMITTED DATA", Submitted);

            if (Submitted.errorMessage) {

                this.setState({message_for_email_taken: Submitted.errorMessage})
                return;
            }
            if(Submitted.token) {
                this.setState({
                    modal: true,

                })
            }
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

                            }} inputRef={this.firstName}
                                          value={this.state.first_name}
                                          onChange={event => this.setState({first_name: event.target.value})}
                                          error={(RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")).test(this.state.first_name)}
                                          helperText={(RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")).test(this.state.first_name) ? '' : 'Enter Correct First Name'}
                                          label="First Name"/>
                            <CssTextField style={{
                                width: "40%",
                                marginTop: "5px",
                                fontFamily: "'Montserrat', sans-serif",
                            }} inputRef={this.lastName} label="Last Name"
                                          value={this.state.last_name}
                                          onChange={event => this.setState({last_name: event.target.value})}
                                          error={(RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")).test(this.state.last_name)}
                                          helperText={(RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")).test(this.state.last_name) ? '' : 'Enter Correct Last Name'}
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
                                          error={(RegExp("^((\"[\\w-\\s]+\")|([\\w-]+(?:\\.[\\w-]+)*)|(\"[\\w-\\s]+\")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$)")).test(this.state.email_id)}
                                          helperText={this.state.message_for_email_taken}

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
                                          error={(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{6,10}$")).test(this.state.pass_word)}
                                          helperText={(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{6,10}$")).test(this.state.pass_word) ? '' : 'Weak Password'}
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
                            }} type={"number"} inputRef={this.phoneno} label="Phone No"
                                          value={this.state.phone_no}
                                          onChange={event => this.setState({phone_no: event.target.value})}
                                          error={(RegExp("^(0/91)?[7-9][0-9]{9}$$")).test(this.state.phone_no)}
                                          helperText={(RegExp("^(0/91)?[7-9][0-9]{9}$")).test(this.state.phone_no) ? '' : 'Enter Correct Phone No'}

                            />
                            <ThemeProvider theme={materialTheme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        disableFuture
                                        openTo="year"
                                        format="dd/MM/yyyy"
                                        label="Date of birth"
                                        views={["year", "month", "date"]}
                                        value={this.state.date}
                                        onChange={date => this.setState({date: date})} style={{
                                        width: "40%",
                                        marginTop: "15px",
                                        color: "white",
                                        fontFamily: "'Montserrat', sans-serif",
                                    }}
                                    />
                                </MuiPickersUtilsProvider>
                            </ThemeProvider>
                            <RadioGroup aria-label="gender" name="gender1" value={this.state.gender}
                                        onChange={event => this.setState({gender: event.target.value})}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"


                                >
                                    <Typography variant="h6" component="h6" style={{
                                        marginRight: "20px",
                                        color: "#fff3e6"
                                    }}>
                                        Gender
                                    </Typography>
                                    <FormControlLabel value="female" control={<CustomRadioButton/>} label="Female"/>
                                    <FormControlLabel value="male" control={<CustomRadioButton/>} label="Male"/>
                                    <FormControlLabel value="other" control={<CustomRadioButton/>} label="Other"/>
                                </Grid>
                            </RadioGroup>
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
        onSubmitToRegister: (firstname, lastname, email_id, password, date, phoneno, gender) => dispatch(actions.patientAuthSignup(firstname, lastname, email_id, password, date, phoneno, gender))
    }
}
// export default (Authentication);
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
