// src/constants/colors.ts
let COLORS: any = {};

export const setColors = (theme: any) => {
  COLORS = {
    primary: theme.primary,
    primary_two: theme.primary_two,
    primary_three: theme.primary_three,
    primary_four: theme.primary_four,
    error: theme.error,
    success: theme.success,
    blue: theme.blue,

    body: theme.body,
    background: theme.background,
    card: theme.card,
    text: theme.text,
    title: theme.title,
    subtitle: theme.subtitle,
    border: theme.border,
    icon: theme.icon,

    white: '#FFFFFF',
    black: '#000000',
  };
};

export { COLORS };