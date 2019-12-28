import { fade, transition } from '@superficial-ui/utils';

const variants = {
  cards: {
    outlined: {
      borderColor: 'gray.light',
      borderSize: '1px',
      borderStyle: 'solid',
      boxShadow: 'none',
    },
    raised: {
      bg: 'white',
      boxShadow: 'xs',
    },
  },
  dividers: {
    inset: {
      ml: '72px',
    },
    light: {
      bg: fade('border', 0.08),
    },
    vertical: {
      height: '100%',
      width: '1px',
    },
  },
  forms: {
    controls: {
      denseMargin: { mt: 2, mb: 1 },
    },
    label: {
      primary: {
        _focus: { color: 'primary.main' },
      },
      secondary: {
        _focus: { color: 'secondary.main' },
      },
    },
    input: {
      filledVariant: {
        control: {},
        root: {
          startAddon: {},
          endAddon: {},
          secondary: {},
        },
        startAddon: {},
        endAddon: {},
        denseMargin: {},
      },
    },
  },
  tables: {
    table: {
      borderColor: 'border',
      borderSpacing: 0,
      borderStyle: 'solid',
      borderWidth: '0px',
      width: '100%',
    },
    tableHead: {},
    tableBody: {},
    tableRow: {
      tableHead: {},
      tableBody: {
        display: 'table-row',
        transition: transition('background-color'),
        _hover: {
          bg: fade('primary', 0.1),
        },
        ':last-child > td': {
          borderBottom: 'none',
        },
      },
    },
    tableCell: {
      tableHead: {
        bg: 'blueGray.500',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderColor: 'border',
        color: 'white',
        fontFamily: 'body',
        fontSize: 'sm',
        fontWeight: 'medium',
        height: '48px',
        px: 5,
        textAlign: 'left',
      },
      tableBody: {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderColor: 'border',
        m: 0,
        px: 5,
        py: 2,
        fontFamily: 'body',
        fontSize: 'sm',
        fontWeight: 'regular',
      },
    },
  },
  toolbars: {
    dense: {
      minHeight: '48px',
    },
    normal: {
      minHeight: ['56px', '64px'],
    },
  },
};

export default variants;
