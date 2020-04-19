const canvas = document.createElement('canvas');

canvas.width = 500;
canvas.height = 500;

document.querySelector('body').appendChild(canvas);

// Initialize the GL context
const gl = canvas.getContext('webgl2');

gl.viewport(0,0,canvas.width,canvas.height);

// create program

const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, 
  '#version 300 es\n' +
  'precision mediump float;\n' +
  '\n' +
  'in vec3 c;\n' +
  'in float startDegrees;\n' +
  'uniform uint time;\n' +
  'out vec4 color;\n' +
  '\n' +
  'void main()\n' +
  '{\n' +
  '  float rotation = radians(float(time % uint(360)));\n' +
  '  gl_Position = vec4(c.x + sin(rotation) * 0.1, c.y + cos(rotation) * 0.1, c.z, 1.0);\n' +
  '  color = vec4(0.5, 0, 0.5, 1.0);\n' +
  '}\n'
);
gl.compileShader(vertShader);

if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
  console.error("Vertex shader did not compile successfully: " + gl.getShaderInfoLog(vertShader));
}

const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader,
  '#version 300 es\n' +
  'precision mediump float;\n' +
  '\n' +
  'in vec4 color;\n' +
  'out vec4 FragColor;\n' +
  '\n' +
  'void main(void)\n' +
  '{\n' +
  '  FragColor = color;\n' +
  '}\n'
);
gl.compileShader(fragShader);

if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
  console.error("Fragment shader did not compile successfully: " + gl.getShaderInfoLog(fragShader));
}

const prog = gl.createProgram();
gl.attachShader(prog, vertShader);
gl.attachShader(prog, fragShader);
gl.linkProgram(prog);

if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
  console.error("Shader program did not link successfully: " + gl.getProgramInfoLog(prog));
}

// create vbo

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  0.5, -0.5, 0.0, 0,
  -0.5, -0.5, 0.0, 90,
  -0.5, 0.5, 0.0, 180,
  0.5, 0.5, 0.0, 270,
]), gl.STATIC_DRAW);



const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
  0, 1, 3,
  1, 2, 3,
]), gl.STATIC_DRAW);



const coord = gl.getAttribLocation(prog, "c");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 4 * 4, 0);
gl.enableVertexAttribArray(coord);

const startDegrees = gl.getAttribLocation(prog, "startDegrees");
gl.vertexAttribPointer(startDegrees, 1, gl.FLOAT, false, 4 * 4, 3);
gl.enableVertexAttribArray(startDegrees);



const time = gl.getUniformLocation(prog, "time");

// drawing

var i = 0;

setInterval(function(){
  gl.clearColor(1, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  gl.useProgram(prog);
  
  gl.uniform1ui(time, 0);
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}, 10);
