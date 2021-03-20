import React, {Component} from "react";
import Navbar from "./Components/Navbar/Navbar";
import PatientHomepage from "./Pages/PatientSide/Homepage/homepage";
import HospitalHomepage from './Pages/HospitalSide/Homepage/homepage';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from './store/actions/patientAuthActions';
import PatientLogin from './Pages/PatientSide/PatientAuth/Login/authenticate';
import PatientRegister from './Pages/PatientSide/PatientAuth/Register/authenticate';
import HospitalAuth from './Pages/HospitalSide/HospitalAuth/HospitalAuth';
import PatientAuth from './Pages/PatientSide/PatientAuth/PatientAuth'
class App extends Component {

    // componentDidMount() {
    //   this.props.onTryAutoSignUp();
    // }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Navbar {...this.props} />
                    <Switch>
                        <Redirect from="/" to="/patient/home" exact/>
                        <Route path="/patient/home" component={PatientHomepage}/>
                        <Route path="/patient/register" component={PatientRegister}/>
                        <Route path="/patient/login" component={PatientLogin}/>
                        <Route path="/patient/auth"component={HospitalAuth}/>

                        <Route path="/hospital/home" component={HospitalHomepage}/>
                        <Route path="/hospital/auth"component={PatientAuth}/>
                        <Route path="/hospital/register" component={PatientRegister}/>
                        <Route path="/hospital/login" component={PatientLogin}/>

                        {/*<Route path="/article/:grid_category/:section/:unique_id" component={Article}/>*/}
                        {/*article/<grid_category>/<section>/<unique_id>*/}
                        {/*<Route path="/post/article" render={(props) => (<PostArticle {...this.props} />)}/>*/}
                    </Switch>
                </React.Fragment>

            </BrowserRouter>
        );
    }

}

// const mapStateToProps = state => {
//
//   return {
//     isAuthenticated: state.token !== null,
//     isAdmin: state.admin_priority,
//     isJournalist:state.journalist_priority,
//     isSubscriber:state.subscriber_priority
//
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignUp: () => dispatch(actions.authCheckState()),
//   }
// }

export default (App);
// export default connect(mapStateToProps, mapDispatchToProps)(App);
