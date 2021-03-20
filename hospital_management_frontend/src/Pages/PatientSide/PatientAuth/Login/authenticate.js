import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CssTextField from "../../../../Components/TextField/TextField";
import {Redirect, Switch} from "react-router-dom";
import ColorButton from "../../../../Components/Button/Button";
import {NavLink} from 'react-router-dom';
import RegisterCss from './auth.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../../../store/actions/patientAuthActions'
import {ListItem} from "@material-ui/core";
import {connect} from "react-redux";


class Login extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEL = React.createRef();

    }

    state = {
        isLogin: false,
        phone_no: null,
        email_id: "reuben211999@gmail.com",
        pass_word: "1234",
        message_for_username_taken: ""

    };


    submitHandler = (event) => {

        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEL.current.value;


        if (email && password) {
            console.log(email, password);
            this.props.onAuth(email, password);


        }


    }

    render() {

        let ErrorMessage = null;
        if (this.props.error) {
            ErrorMessage = (<h2>{this.props.error}</h2>);

        }
        if (this.props.isAuthenticated) {
            return <Redirect to="/home" exact/>;
        }
        return (
            <>
                {ErrorMessage}
                {
                    this.props.loading ? <CircularProgress/> : <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <div style={{
                            fontFamily: "'Montserrat', sans-serif",
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

                                    // marginBottom:"-50px",
                                    fontFamily: "'Montserrat', sans-serif",
                                }}>
                                    Welcome Back

                                </h1>
                            </Grid>

                            <CssTextField style={{
                                width: "100%",
                                marginTop: "10px",
                                fontFamily: "'Montserrat', sans-serif",
                            }} type={"email"} inputRef={this.emailEl} label="Email Id"

                                          value={this.state.email_id}
                                          onChange={event => this.setState({email_id: event.target.value})}
                                          error={(RegExp("^((\"[\\w-\\s]+\")|([\\w-]+(?:\\.[\\w-]+)*)|(\"[\\w-\\s]+\")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$)")).test(this.state.email_id)}
                                          helperText={(RegExp("^((\"[\\w-\\s]+\")|([\\w-]+(?:\\.[\\w-]+)*)|(\"[\\w-\\s]+\")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$)")).test(this.state.email_id) ? '' : 'Enter Correct Email'}

                            />
                            <CssTextField style={{
                                width: "100%",
                                marginTop: "10px",
                                fontFamily: "'Montserrat', sans-serif",
                            }}

                                          type={"password"}
                                          inputRef={this.passwordEL} label="Password"

                                          value={this.state.pass_word}
                                          onChange={event => this.setState({pass_word: event.target.value})}
                                          error={(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{6,10}$")).test(this.state.pass_word)}
                                          helperText={(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{6,10}$")).test(this.state.pass_word) ? '' : 'Weak Password'}
                            />
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center">
                                <ColorButton style={{
                                    marginTop: "20px",
                                    border: "1px solid #fff3e6"
                                }} type="submit"> Login In</ColorButton>
                            </Grid>
                        </form>

                    </Grid>
                }


            </>
        );

    }
}

// const mapStateToProps = state => {
//
//     return {
//         isAuthenticated: state.token !== null,
//         isAdmin: state.admin_priority,
//         loading: state.loading,
//         error: state.error
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (email_id, password) => dispatch(actions.authLogin(email_id, password))
//     }
// }
export default (Login);
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
