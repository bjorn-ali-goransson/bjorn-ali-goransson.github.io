// Three.js ray.intersects with offset canvas

var container, camera, scene, renderer, mesh,

    mouse = { x: 0, y: 0 },
    objects = [],
    
    count = 0,

    CANVAS_WIDTH = 200,
    CANVAS_HEIGHT = 300;

container = document.getElementById( 'canvas' );
document.body.appendChild(container);

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
container.appendChild(renderer.domElement);

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000);
camera.position.y = 500;
camera.position.z = 500;
camera.lookAt(scene.position);

var bluePoint = new THREE.PointLight(0xaaaaaa, 3, 1000);
bluePoint.position.set(250, 220, 300);
scene.add(bluePoint);

var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

var group = new THREE.Object3D();

addBox([0, 20, 0], [150, 50, 100], 0.8, 0xC25B3C);
addBox([0, 20, 0], [140, 55, 90], 0.8, 0xF1F1F1);
addBox([-50, 10, -30], [50, 30, 50], 0.3, 0xC25B3C);
addBox([-50, 10, -30], [40, 35, 40], 0.3, 0xF1F1F1);
addBox([90, 20, 50], [100, 41, 100], 0.9, 0xC3995D);
addBox([90, 20, 50], [90, 45, 90], 0.9, 0xF1F1F1);
addBox([100, 20, -30], [70, 35, 100], 0.8, 0xC3995D);
addBox([100, 20, -30], [60, 40, 90], 0.8, 0xF1F1F1);

function addBox(position, dimension, rotation, color){
  var geometry = new THREE.BoxGeometry(dimension[0], dimension[1], dimension[2]);
  var material = new THREE.MeshLambertMaterial({ color : color, side: THREE.DoubleSide });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = position[0];
  mesh.position.y = position[1];
  mesh.position.z = position[2];
  mesh.rotation.y = Math.PI * rotation / 2;

  group.add(mesh);
}

scene.add(group);

var vector = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

function render() {
    group.rotation.y += 0.001;
    renderer.render(scene, camera);
}

(function animate() {
    requestAnimationFrame(animate);
    render();
})();

