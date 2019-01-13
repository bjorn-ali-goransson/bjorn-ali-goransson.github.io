function initMap() {
  var zoom = 18;
  var map = new google.maps.Map(document.getElementById('map'), {
    // mapTypeId: 'satellite',
    zoom: zoom,
    center: {lat: 55.6073615, lng: 12.9940421},
    visibility: 'simplified',
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: false,
    maxZoom: zoom,
    minZoom: zoom,
  });
  
  var scene2 = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = 500;
  camera.position.z = 500;
  camera.lookAt(scene2.position);
  
  //CSS Object
  var div = new THREE.CSS3DObject(document.getElementById('map'));
  div.position.x = 0;
  div.position.y = 0;
  div.position.z = 0;
  div.rotation.x = -Math.PI / 2;
  div.rotation.y = 0;
  div.rotation.z = -Math.PI / 4;
  scene2.add(div);
  
  var renderer2 = new THREE.CSS3DRenderer();
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 0;
  document.body.appendChild(renderer2.domElement);
  
  function animate() {
      div.rotation.z += 0.001;
      
      requestAnimationFrame(animate);
      renderer2.render(scene2, camera);
  }
  
  animate();
}