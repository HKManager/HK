export default `\
#define SHADER_NAME trips-layer-vertex-shader
attribute vec3 positions;
attribute vec3 colors;
uniform float opacity;
uniform float currentTime;
uniform float trailLength;
varying float vTime;
varying vec4 vColor;
void main(void) {
  vec2 p = project_position(positions.xy);
  // the magic de-flickering factor
  vec4 shift = vec4(0., 0., mod(positions.z, trailLength) * 1e-4, 0.);
  gl_Position = project_to_clipspace(vec4(p, 1., 1.)) + shift;
  vColor = vec4(colors / 255.0, opacity);
  vTime = 1.0 - (currentTime - positions.z) / trailLength;
}
`;