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

if(1){
  var dimension = 20;
  var height = 12;
  var rotation = 0.1;

  var geometry = new THREE.BoxGeometry(dimension, height, dimension);
  var material = new THREE.MeshLambertMaterial({ color : 0xffffff, side: THREE.DoubleSide });
  var group=new THREE.Object3D();

  for(var i = 0; i < 10; i++){
    var mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    mesh.position.y = i * height;
    mesh.rotation.y = i * rotation + 0.1*2;
  }

  // group.rotation.y = 3.141/3;

  scene.add(group);
}



// find intersections
var vector = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

function render() {

    group.rotation.y += 0.001;
    
    renderer.render( scene, camera );

}

(function animate() {

    requestAnimationFrame( animate );

    render();

})();

