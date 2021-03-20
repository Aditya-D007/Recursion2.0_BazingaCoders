import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CssTextField from "../../../../Components/TextField/TextField";
import {Redirect, Switch} from "react-router-dom";
import ColorButton from "../../../../Components/Button/Button";
import {NavLink} from 'react-router-dom';

import RegisterCss from './auth.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../../../store/actions/hospitalAuthActions'

import {
    ListItem,

} from "@material-ui/core";
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
        email_id: "gemhospital@gmail.com",
        pass_word: "12345678",
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
        if(this.props.isAuthenticated) {
            return  <Redirect to="/home" exact/>;
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
                                    Login with Hospital Details

                                </h1>
                            </Grid>

                            <CssTextField style={{
                                width: "100%",
                                marginTop: "10px",
                                fontFamily: "'Montserrat', sans-serif",
                            }} type={"email"} inputRef={this.emailEl} label="Email Id"

                                          value={this.state.email_id}
                                          onChange={event => this.setState({email_id: event.target.value})}
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

const mapStateToProps = state => {

    return {
        isAuthenticated: state.hospitalReducer.token !== null,
        user_type: state.hospitalReducer.user_type,
        user_id: state.hospitalReducer.user_id,
        loading: state.hospitalReducer.loading,
        error: state.hospitalReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email_id, password) => dispatch(actions.hospitalAuthLogin(email_id, password))
    }
}
// export default (Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
