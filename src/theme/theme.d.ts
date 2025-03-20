// // theme.d.ts

// import { Theme as MuiTheme } from '@mui/material/styles';

// declare module '@mui/material/styles' {
//   interface Theme {
//     customShadows: {
//       light: Shadow;
//       dark: Shadow;
//     };
//     shape: {
//       borderRadius: number;
//     };
//   }

//   interface ThemeOptions {
//     customShadows?: {
//       light?: Shadow;
//       dark?: Shadow;
//     };
//     shape?: {
//       borderRadius?: number;
//     };
//   }
// }


import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      primary: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: {
      primary: string;
    };
  }
}