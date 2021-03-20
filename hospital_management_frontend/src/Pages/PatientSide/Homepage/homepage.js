import React, {Component} from "react";
import image from './undraw_social_distancing_2g0u.svg'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SimpleCard from "../../../Components/Card/Card";
import imageMapDark from './undraw_Map_dark_re_36sy.svg';
import imageSignIn from './undraw_secure_login_pdn4.svg';
import imageCenter from './undraw_My_location_re_r52x.svg';
import imageSleep from './undraw_sleep_analysis_o5f9.svg';
class Homepage extends Component {
    render() {
        return (
                <>
                    <div style={{
                        margin:10
                    }}>


                    <Grid container spacing={3}>

                        <Grid item xs={6}>
                            <div style={{
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"
                            }}>
                                <h3 style={{
                                    fontSize:"90px",
                                    color:"whitesmoke"
                                }}>
                                    Maintain <br/> Social <br/>  Distancing
                                </h3>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{
                                display:"flex",
                                justifyContent:"center"
                            }}>
                                <img style={{
                                    width:"60%"
                                }} src={image} alt=""/>
                            </div>

                        </Grid>
                        <Grid item xs={3}>
                            <SimpleCard title={"Finding Hospital Beds"} image={imageMapDark}/>
                        </Grid>
                        <Grid item xs={3}>
                            <SimpleCard title={"Sign In Now"} image={imageSignIn}/>
                        </Grid>
                        <Grid item xs={3}>
                            <SimpleCard title={"Finding Nearest Vaccination Center"} image={imageCenter}/>
                        </Grid>
                        <Grid item xs={3}>
                            <SimpleCard title={"Finding Hospital Beds"} image={imageSleep} />
                        </Grid>
                    </Grid>
                    </div>
                </>
        );
    }
}

export default Homepage;
