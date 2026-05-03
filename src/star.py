# __pragma__ ('alias', 'dict', 'Object')
# __pragma__ ('alias', 'list', 'Array')

def compute(args):
    # Using JS properties directly
    center = args.center
    outerRadius = args.outerRadius
    innerRadius = args.innerRadius
    points = args.points
    
    # Using JS Math directly to avoid math module dependency
    numPoints = Math.max(3, Math.floor(points))
    vertices = []
    angleStep = Math.PI / numPoints
    outputNodes = {}

    # range() is translated to a clean for-loop by Transcrypt
    for i in range(int(2 * numPoints)):
        r = outerRadius if i % 2 == 0 else innerRadius
        angle = i * angleStep - Math.PI / 2
        
        # Plain JS object creation
        pt = {
            'type': 'Point',
            'x': center.x + r * Math.cos(angle),
            'y': center.y + r * Math.sin(angle)
        }
        # Avoid .format() which uses runtime
        outputNodes['p_' + str(i)] = pt
        # Use .push() instead of .append() to avoid runtime
        vertices.push(pt)

    for i in range(int(2 * numPoints)):
        # Use JS-style indexing and concat
        outputNodes['l_' + str(i)] = {
            'type': 'Line',
            'p1': vertices[i],
            'p2': vertices[(i + 1) % int(2 * numPoints)]
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

__pragma__('js', 'export { NStarExt };')
