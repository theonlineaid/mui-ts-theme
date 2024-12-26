// ----------------------------------------------------------------------

export default function Paper(theme: any) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      variants: [
        {
          props: { variant: 'outlined' },
          style: { borderColor: theme.palette.grey[500_12] },
        },
      ],

      styleOverrides: {
        root: {
          backgroundImage: `
            url("https://assets.minimals.cc/public/assets/core/cyan-blur.png"),
            url("https://assets.minimals.cc/public/assets/core/red-blur.png")
          `,
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: '50%, 50%',
          backgroundPosition: 'right top, left bottom',
          backdropFilter: "blur(20px)"
        },
      },
    },
  };
}
