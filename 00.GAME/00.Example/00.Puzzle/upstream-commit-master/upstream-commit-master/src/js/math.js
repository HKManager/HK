export const PI2 = 2 * Math.PI;
export const HALF_PI = Math.PI / 2;

export function random( min, max ) {
  return min + Math.random() * ( max - min );
}

export function distanceTo( x0, y0, x1, y1 ) {
  const dx = x1 - x0;
  const dy = y1 - y0;

  return Math.sqrt( dx * dx + dy * dy );
}

export function lerp( a, b, t ) {
  return a + t * ( b - a );
}

export function inverseLerp( a, b, x ) {
  return ( x - a ) / ( b - a );
}

export function map( x, a, b, c, d ) {
  return lerp( c, d, inverseLerp( a, b, x ) );
}

export function angleTo( v0, v1 ) {
  let angle = Math.atan2( v0.y - v1.y, v0.x - v1.x );
  if ( angle < 0 ) { angle += PI2; }
  return angle;
}

export function easeInExpo( x, t, b, c, d ) {
  return t === 0 ? b : c * Math.pow( 2, 10 * ( t / d - 1 ) ) + b;
}

export function sign( x0, y0, x1, y1, x2, y2 ) {
  return ( x0 - x2 ) * ( y1 - y2 ) - ( x1 - x2 ) * ( y0 - y2 );
}

export function pointInTriangle( x, y, x0, y0, x1, y1, x2, y2 ) {
  const b0 = sign( x, y, x0, y0, x1, y1 ) < 0;
  const b1 = sign( x, y, x1, y1, x2, y2 ) < 0;
  const b2 = sign( x, y, x2, y2, x0, y0 ) < 0;

  return b0 === b1 && b1 === b2;
}

// Thanks, Casey!! :)
// Code adapted from Paul Bourke:
// http://local.wasp.uwa.edu.au/~pbourke/geometry/sphereline/raysphere.c
export function circleSegmentIntersection( cx, cy, r, x0, y0, x1, y1 ) {
  const dx = x1 - x0;
  const dy = y1 - y0;

  // Transform to circle space.
  x0 -= cx;
  y0 -= cy;

  // Compute coefficients.
  const a = ( dx * dx ) + ( dy * dy );
  const b = 2 * ( x0 * dx + y0 * dy );
  const c = ( x0 * x0 ) + ( y0 * y0 ) - ( r * r );

  // Compute discriminant.
  let d = b * b - 4 * a * c;

  // No intersection.
  if ( d < 0 ) {
    return false;
  }

  // One possible intersection.
  if ( !d ) {
    const t = -b / ( 2 * a );
    return 0 <= t && t <= 1;
  }

  d = Math.sqrt( d );

  // Two possible intersections.
  const t0 = ( -b - d ) / ( 2 * a );
  const t1 = ( -b + d ) / ( 2 * a );

  return 0 <= t0 && t0 <= 1 ||
         0 <= t1 && t1 <= 1;
}
