const canvas = document.createElement('canvas');

canvas.width = 500;
canvas.height = 500;

document.querySelector('body').appendChild(canvas);

// Initialize the GL context
const gl = canvas.getContext('webgl');

gl.viewport(0,0,canvas.width,canvas.height);

// create program

const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, 'attribute vec3 c;void main(void){gl_Position=vec4(c, 1.0);}');
gl.compileShader(vertShader);

const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, 'void main(void){gl_FragColor=vec4(0,1,0,1);}');
gl.compileShader(fragShader);

const prog = gl.createProgram();
gl.attachShader(prog, vertShader);
gl.attachShader(prog, fragShader);
gl.linkProgram(prog);

// create vbo

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  0.5,-0.5,0.0,
  -0.5,-0.5,0.0,
  -0.5,0.5,0.0,
  0.5,0.5,0.0,
]), gl.STATIC_DRAW);




const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
  0, 1, 3,
  1, 2, 3,
]), gl.STATIC_DRAW);




const coord = gl.getAttribLocation(prog, "c");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

// drawing

gl.clearColor(1, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(prog);
gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
