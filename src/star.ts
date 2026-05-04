import { CircleNode, ExtensionDef, GeometricNode, LineNode, PointNode } from "./user-ext-def";

const OUTPUT_TYPE = 'NStar';
export const NStarExt: ExtensionDef<typeof OUTPUT_TYPE> = {
  name: 'N-Pointed Star',
  keyword: 'n-star',
  parameters: [
    { argName: 'center', type: 'Point', defaultValue: 'p0' },
    { argName: 'outerRadius', type: 'Scalar', defaultValue: 4 },
    { argName: 'innerRadius', type: 'Scalar', defaultValue: 2 },
    { argName: 'points', type: 'Scalar', defaultValue: 5 }
  ],
  outputType: OUTPUT_TYPE,

  compute: ({ center, outerRadius, innerRadius, points }) => {
    const numPoints = Math.max(3, Math.floor(points));
    const vertices = [];
    const angleStep = Math.PI / numPoints;
    const outputNodes: Record<string, GeometricNode> = {};

    for (let i = 0; i < 2 * numPoints; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * angleStep - Math.PI / 2;
      const pt: PointNode = {
        type: 'Point',
        x: center.x + r * Math.cos(angle),
        y: center.y + r * Math.sin(angle)
      };
      outputNodes[`p_${i}`] = pt;
      vertices.push(pt);
    }

    for (let i = 0; i < 2 * numPoints; i++) {
      outputNodes[`l_${i}`] = {
        type: 'Line',
        p1: vertices[i],
        p2: vertices[(i + 1) % (2 * numPoints)]
      } as LineNode;
    }

    outputNodes['main'] = {
      type: OUTPUT_TYPE,
      center,
      vertices
    };

    outputNodes['boundaryCircle'] = {
      type: 'Circle',
      center,
      radius: { type: 'Scalar', value: outerRadius }
    } as CircleNode;

    return outputNodes;
  }
};

