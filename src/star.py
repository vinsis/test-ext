import math

def compute(args):
    center = args.center
    outerRadius = args.outerRadius
    innerRadius = args.innerRadius
    points = args.points
    
    numPoints = int(max(3, math.floor(points)))
    vertices = []
    angleStep = math.pi / numPoints
    outputNodes = {}

    for i in range(2 * numPoints):
        r = outerRadius if i % 2 == 0 else innerRadius
        angle = i * angleStep - math.pi / 2
        pt = {
            'type': 'Point',
            'x': center.x + r * math.cos(angle),
            'y': center.y + r * math.sin(angle)
        }
        outputNodes['p_{}'.format(i)] = pt
        vertices.append(pt)

    for i in range(2 * numPoints):
        outputNodes['l_{}'.format(i)] = {
            'type': 'Line',
            'p1': vertices[i],
            'p2': vertices[(i + 1) % (2 * numPoints)]
        }

    outputNodes['main'] = {
        'type': 'NStar',
        'center': center,
        'vertices': vertices
    }

    outputNodes['boundaryCircle'] = {
        'type': 'Circle',
        'center': center,
        'radius': { 'type': 'Scalar', 'value': outerRadius }
    }

    return outputNodes

NStarExt = {
    'name': 'N-Pointed Star',
    'keyword': 'n-star',
    'parameters': [
        { 'argName': 'center', 'type': 'Point', 'defaultValue': 'p0', 'variadic': False },
        { 'argName': 'outerRadius', 'type': 'Scalar', 'defaultValue': 4, 'variadic': False },
        { 'argName': 'innerRadius', 'type': 'Scalar', 'defaultValue': 2, 'variadic': False },
        { 'argName': 'points', 'type': 'Scalar', 'defaultValue': 5, 'variadic': False }
    ],
    'outputType': 'NStar',
    'compute': compute
}

# Export for ES6
__pragma__('js', 'export { NStarExt };')
