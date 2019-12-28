// import { getColor, fade } from '@superficial-ui/utils';

// const umbra = {
//   opacity: 0.2,
//   elevations: [
//     [0, 2, 1, -1],
//     [0, 3, 1, -2],
//     [0, 3, 3, -2],
//     [0, 2, 4, -1],
//     [0, 3, 5, -1],
//     [0, 3, 5, -1],
//     [0, 4, 5, -2],
//     [0, 5, 5, -3],
//     [0, 5, 6, -3],
//     [0, 6, 6, -3],
//     [0, 6, 7, -4],
//     [0, 7, 8, -4],
//     [0, 7, 8, -4],
//     [0, 7, 9, -4],
//     [0, 8, 9, -5],
//     [0, 8, 10, -5],
//     [0, 8, 11, -5],
//     [0, 9, 11, -5],
//     [0, 9, 12, -6],
//     [0, 10, 13, -6],
//     [0, 10, 13, -6],
//     [0, 10, 14, -6],
//     [0, 11, 14, -7],
//     [0, 11, 15, -7],
//   ],
// };

// const penumbra = {
//   opacity: 0.14,
//   elevations: [
//     [0, 1, 1, 0],
//     [0, 2, 2, 0],
//     [0, 3, 4, 0],
//     [0, 4, 5, 0],
//     [0, 5, 8, 0],
//     [0, 6, 10, 0],
//     [0, 7, 10, 1],
//     [0, 8, 10, 1],
//     [0, 9, 12, 1],
//     [0, 10, 14, 1],
//     [0, 11, 15, 1],
//     [0, 12, 17, 2],
//     [0, 13, 19, 2],
//     [0, 14, 21, 2],
//     [0, 15, 22, 2],
//     [0, 16, 24, 2],
//     [0, 17, 26, 2],
//     [0, 18, 28, 2],
//     [0, 19, 29, 2],
//     [0, 20, 31, 3],
//     [0, 21, 33, 3],
//     [0, 22, 35, 3],
//     [0, 23, 36, 3],
//     [0, 24, 38, 3],
//   ],
// };

// const ambient = {
//   opacity: 0.12,
//   elevations: [
//     [0, 1, 3, 0],
//     [0, 1, 5, 0],
//     [0, 1, 8, 0],
//     [0, 1, 10, 0],
//     [0, 1, 14, 0],
//     [0, 1, 18, 0],
//     [0, 2, 16, 1],
//     [0, 3, 14, 2],
//     [0, 3, 16, 2],
//     [0, 4, 18, 3],
//     [0, 4, 20, 3],
//     [0, 5, 22, 4],
//     [0, 5, 24, 4],
//     [0, 5, 26, 4],
//     [0, 6, 28, 5],
//     [0, 6, 30, 5],
//     [0, 6, 32, 5],
//     [0, 7, 34, 6],
//     [0, 7, 36, 6],
//     [0, 8, 38, 7],
//     [0, 8, 40, 7],
//     [0, 8, 42, 7],
//     [0, 9, 44, 8],
//     [0, 9, 46, 8],
//   ],
// };

// export const createShadow = ({ elevation = 1, color = 'black' }) =>
//   [
//     `${umbra.elevations[elevation].map(v => `${v}px`).join(' ')} ${fade(
//       getColor(color)(),
//       umbra.opacity,
//     )()}`,
//     `${penumbra.elevations[elevation].map(v => `${v}px`).join(' ')} ${fade(
//       getColor(color)(),
//       penumbra.opacity,
//     )()}`,
//     `${ambient.elevations[elevation].map(v => `${v}px`).join(' ')} ${fade(
//       getColor(color)(),
//       ambient.opacity,
//     )()}`,
//   ].join(',');

// export const shadows = [...Array(25)].map((x, i) =>
//   i < 1 ? 'none' : createShadow({ elevation: i - 1 }),
// );
// /** Aliases */
// shadows.xs = shadows[1];
// shadows.sm = shadows[2];
// shadows.md = shadows[3];
// shadows.lg = shadows[4];
// shadows.xl = shadows[6];
// shadows['2xl'] = shadows[8];
// shadows['3xl'] = shadows[12];
// shadows['4xl'] = shadows[16];
// shadows['5xl'] = shadows[24];

// export default shadows;

const shadows = {
  '1':
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  '2':
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12',
  '3':
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  '4':
    'px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '5':
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  '6':
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  '7':
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  '8':
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  '9':
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  '10':
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  '11':
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  '12':
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  '13':
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  '14':
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  '15':
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  '16':
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  '17':
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  '18':
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  '19':
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  '20':
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  '21':
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  '22':
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  '23':
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
  '24':
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
};
shadows.xs = shadows[1];
shadows.sm = shadows[2];
shadows.md = shadows[3];
shadows.lg = shadows[4];
shadows.xl = shadows[6];
shadows['2xl'] = shadows[8];
shadows['3xl'] = shadows[12];
shadows['4xl'] = shadows[16];
shadows['5xl'] = shadows[24];

export default shadows;
