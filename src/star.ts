export interface ExtensionDef {
  name: string;
  keyword: string;
  parameters: any[];
  outputType: string;
  compute: (args: Record<string, any>) => Record<string, any>;
}

export const NStarExt: ExtensionDef = {
  name: 'N-Pointed Star',
  keyword: 'n-star',
  parameters: [
    { argName: 'center', type: 'Point', defaultValue: 'p0', variadic: false },
    { argName: 'outerRadius', type: 'Scalar', defaultValue: 4, variadic: false },
    { argName: 'innerRadius', type: 'Scalar', defaultValue: 2, variadic: false },
    { argName: 'points', type: 'Scalar', defaultValue: 5, variadic: false }
  ],
  outputType: 'NStar',

  compute: ({ center, outerRadius, innerRadius, points }) => {
    const numPoints = Math.max(3, Math.floor(points));
    const vertices = [];
    const angleStep = Math.PI / numPoints;
    const outputNodes: Record<string, any> = {};

    for (let i = 0; i < 2 * numPoints; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * angleStep - Math.PI / 2;
      const pt = {
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
      };
    }

    outputNodes['main'] = {
      type: 'NStar',
      center,
      vertices
    };

    outputNodes['boundaryCircle'] = {
      type: 'Circle',
      center,
      radius: { type: 'Scalar', value: outerRadius }
    };

    return outputNodes;
  }
};

