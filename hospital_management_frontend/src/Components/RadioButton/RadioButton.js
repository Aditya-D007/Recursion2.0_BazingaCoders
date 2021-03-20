import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';


const CustomRadioButton = withStyles({
  root: {
    color: "#fff3e6",
    '&$checked': {
      color: "#fff3e6",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


export default CustomRadioButton;