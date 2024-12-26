// @mui
import { useTheme, Theme, Breakpoint } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

type FontVariant = keyof Theme['typography'];

export default function GetFontValue(variant: FontVariant) {
  const theme = useTheme();

  const breakpoints = useWidth();

  // Adjusting for responsive typography based on the breakpoint
  const key = theme.breakpoints.up(breakpoints === 'xl' ? 'lg' : breakpoints);

  // Check if the variant has responsive typography
  const hasResponsive =
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6';

  // Retrieve the typography settings for the given variant
  const getFont =
    hasResponsive && theme.typography[variant] && (theme.typography[variant] as any)[key]
      ? (theme.typography[variant] as any)[key]
      : theme.typography[variant];

  // Calculate font properties
  const fontSize = remToPx(getFont.fontSize as string);
  const lineHeight = Number(getFont.lineHeight) * fontSize;
  const fontWeight = getFont.fontWeight as number;
  const letterSpacing = getFont.letterSpacing as string;

  return { fontSize, lineHeight, fontWeight, letterSpacing };
}

// ----------------------------------------------------------------------

export function remToPx(value: string): number {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({
  sm,
  md,
  lg,
}: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

function useWidth(): Breakpoint {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    (keys.reduce<Breakpoint | null>((output, key) => {
      const matches = useResponsive('up', key as Breakpoint);
      return !output && matches ? key : output;
    }, null) as Breakpoint) || 'xs'
  );
}
