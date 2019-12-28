/**
 * Space Scale
 * -----------------------------
 *  ‣ 0          0         0px
 *  ‣ 1  [xs]    0.25rem   4px
 *  ‣ 2  [sm]    0.5rem    8px
 *  ‣ 3  [md]    0.75rem   12px
 *  ‣ 4  [lg]    1rem      16px
 *  ‣ 5  [xl]    1.25rem   20px
 *  ‣ 6  [2xl]   1.5rem    24px
 *  ‣ 8  [3xl]   2rem      32px
 *  ‣ 10 [4xl]   2.5rem    40px
 *  ‣ 12 [5xl]   3rem      48px
 *  ‣ 14 [6xl]   3.5rem    56px
 *  ‣ 16         4rem      64px
 *  ‣ 20         5rem      80px
 *  ‣ 24         6rem      96px
 *  ‣ 32         8rem      128px
 *  ‣ 40         10rem     160px
 *  ‣ 48         12rem     192px
 *  ‣ 56         14rem     224px
 *  ‣ 64         16rem     256px
 */
const space = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem',
};
space.xs = space[1];
space.sm = space[2];
space.md = space[3];
space.lg = space[4];
space.xl = space[5];
space['2xl'] = space[6];
space['3xl'] = space[8];
space['4xl'] = space[10];
space['5xl'] = space[12];
space['6xl'] = space[16];

export default space;
