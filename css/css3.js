import { css } from 'glamor';
import glamorous, { ThemeProvider } from 'glamorous';














exports.box3label = glamorous.div(({ theme }) => ({
    flex: theme.boxlabel.flex,
    width: theme.boxlabel.width,
    margin: theme.boxlabel.margin,
    padding: theme.boxlabel.padding,
    textAlign: theme.boxlabel.textalign,
    borderRadius: theme.boxlabel.borderradius,
  }));
