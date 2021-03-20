import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, useTheme} from '@material-ui/core/styles';
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


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
}));

export default function SimpleTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{
            flexGrow:1,

        }} >
            <AppBar position="static" style={{
                backgroundColor: "#1a508b",
                // color: Colors.WHITE_ISH,

            }}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Register" style={{
                        padding: 0,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "15px",
                        // color: Colors.DARK_GREENISH,
                        // backgroundColor: Colors.WHITE_ISH,
                        // border:"1px solid"+Colors.DARK_GREENISH
                    }}/>
                    <Tab label="Login" style={{
                        padding: 0,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "15px",
                        // color: Colors.DARK_GREENISH,
                        // backgroundColor: Colors.WHITE_ISH,
                        // border:"1px solid"+Colors.DARK_GREENISH
                    }}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <HospitalRegister/>

            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <HospitalLogin/>
            </TabPanel>

        </div>
    );
}

