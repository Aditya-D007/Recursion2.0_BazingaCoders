import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Route, Switch} from "react-router-dom";
import HospitalRegister from "./Register/authenticate";
import HospitalLogin from "./Login/authenticate";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SimpleTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{
            flexGrow:1,

        }} >
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Register" style={{
                        backgroundColor:"transparent"
                    }}/>
                    <Tab label="Login" style={{
                        backgroundColor:"transparent"
                    }}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <HospitalRegister/>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <HospitalLogin/>
            </TabPanel>

        </div>
    );
}

