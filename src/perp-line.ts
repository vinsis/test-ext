import { ExtensionDef, LineNode, PointNode } from "./user-ext-def";

export const PerpendicularLineExt: ExtensionDef<'Line'> = {
  name: 'Perpendicular Line',
  keyword: 'perp-line',
  parameters: [
    { argName: 'point', type: 'Point', defaultValue: 'p0' },
    { argName: 'line', type: 'Line', defaultValue: 'l0' }
  ],
  outputType: 'Line',

  compute: ({ point, line }) => {
    const p1 = line.p1;
    const p2 = line.p2;

    const rotate = (p: PointNode, center: PointNode): PointNode => {
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      return {
        type: 'Point',
        x: center.x - dy,
        y: center.y + dx
      };
    };

    const p1Rot = rotate(p1, point);
    const p2Rot = rotate(p2, point);

    const mainLine: LineNode = {
      type: 'Line',
      p1: p1Rot,
      p2: p2Rot
    };

    return {
      p1_rot: p1Rot,
      p2_rot: p2Rot,
      main: mainLine
    };
  }
};
