import { alpha } from '@mui/material/styles';

type GradientColors = {
  color1: string;
  color2: string;
};

type ColorShades = {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
};

type GreyShades = {
  [key: number]: string | ReturnType<typeof alpha>;
};

type Gradients = {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
};

type ChartColors = {
  violet: string[];
  blue: string[];
  green: string[];
  yellow: string[];
  red: string[];
};

type ActionStates = {
  hover: string | ReturnType<typeof alpha>;
  selected: string | ReturnType<typeof alpha>;
  disabled: string | ReturnType<typeof alpha>;
  disabledBackground: string | ReturnType<typeof alpha>;
  focus: string | ReturnType<typeof alpha>;
  hoverOpacity: number;
  disabledOpacity: number;
};

type CommonPalette = {
  common: { black: string; white: string };
  primary: ColorShades & { contrastText: string };
  secondary: ColorShades & { contrastText: string };
  info: ColorShades & { contrastText: string };
  success: ColorShades & { contrastText: string };
  warning: ColorShades & { contrastText: string };
  error: ColorShades & { contrastText: string };
  grey: GreyShades;
  gradients: Gradients;
  chart: ChartColors;
  divider: string | ReturnType<typeof alpha>;
  action: ActionStates;
};

type PaletteMode = {
  mode: 'light' | 'dark';
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    paper: string;
    default: string;
    neutral: string;
  };
  action: {
    active: string;
    hover: string | ReturnType<typeof alpha>;
    selected: string | ReturnType<typeof alpha>;
    disabled: string | ReturnType<typeof alpha>;
    disabledBackground: string | ReturnType<typeof alpha>;
    focus: string | ReturnType<typeof alpha>;
    hoverOpacity: number;
    disabledOpacity: number;
  };
} & CommonPalette;

// ----------------------------------------------------------------------

function createGradient({ color1, color2 }: GradientColors): string {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY: ColorShades = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#0162C4',
  dark: '#007B55',
  darker: '#005249',
};

const SECONDARY: ColorShades = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
};

const INFO: ColorShades = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};

const SUCCESS: ColorShades = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};

const WARNING: ColorShades = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};

const ERROR: ColorShades = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
};

const GREY: GreyShades = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const GRADIENTS: Gradients = {
  primary: createGradient({ color1: PRIMARY.light, color2: PRIMARY.main }),
  info: createGradient({ color1: INFO.light, color2: INFO.main }),
  success: createGradient({ color1: SUCCESS.light, color2: SUCCESS.main }),
  warning: createGradient({ color1: WARNING.light, color2: WARNING.main }),
  error: createGradient({ color1: ERROR.light, color2: ERROR.main }),
};

const CHART_COLORS: ChartColors = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON: CommonPalette = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
