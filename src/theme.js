import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import './nokia_fonts.css';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#094391',
      background: '#556cd6',
      //main: '#556cd6',
      //background: '#001235',
    },
    secondary: {
      main: '#556cd6',
      //main: '#19857b',
    },
    icons: {
      color: '#000',
      //main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    action: {
      selected: '#9e9e9e',
      hover: '#e0e0e0',
      disabled: '#e0e0e0'
  }    
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'NokiaPureHeadlineLight',
      'NokiaThemeIcons',
      'NokiaPureHeadline',
      'Helvetica',
      'Arial',
    ].join(','),
  },
});
export default theme;

