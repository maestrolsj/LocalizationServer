import { createMuiTheme } from '@material-ui/core/styles';
import { light } from '@material-ui/core/styles/createPalette';

/**
 * material-ui theme color pallete
 * @see https://material-ui.com/style/color/
 */

export const themeColor = {
    50: '#fae7e7',
    100: '#f2c4c4',
    200: '#ea9d9d',
    300: '#e27676',
    400: '#db5858',
    500: '#d53b3b',
    600: '#d03535',
    700: '#ca2d2d',
    800: '#c42626',
    900: '#ba1919',
    A100: '#ffeeee',
    A200: '#ffbbbb',
    A400: '#ff8888',
    A700: '#ff6e6e',
    contrastDefaultColor: 'light',
};

const materialTheme = createMuiTheme({});

export default materialTheme;
