/**
 * UBC CPSC 314, January 2016
 * Project 3 Template
 */

var scene = new THREE.Scene();

// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var aspect = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 10000);
camera.position.set(10,15,40);
camera.lookAt(scene.position); 
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// FLOOR WITH CHECKERBOARD 
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// LIGHTING UNIFORMS
var lightColor = new THREE.Color(1,1,1);
var ambientColor = new THREE.Color(0.4,0.4,0.4);
var lightPosition = new THREE.Vector3(70,100,70);

var litColor = new THREE.Color(0.3,0.4,0.6);
var unLitColor = new THREE.Color(0.15,0.2,0.3);
var outlineColor = new THREE.Color(0.04,0.1,0.15);

var litArmadilloColor = new THREE.Color(0.15,0.6,0.3);
var unLitArmadilloColor = new THREE.Color(0.04,0.3,0.15);

var kAmbient = 0.4;
var kDiffuse = 0.8;
var kSpecular = 0.8;
var shininess = 10.0;
var toneBalance = 0.5;

// MATERIALS
var defaultMaterial = new THREE.MeshLambertMaterial();
var armadilloMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type: 'f', value: kAmbient},
     kDiffuse : {type: 'f', value: kDiffuse},
     kSpecular: {type: 'f', value: kSpecular},
     shininess : {type: 'f', value: shininess},
   },
})

var sphereOneMaterial = new THREE.ShaderMaterial({
  uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type: 'f', value: kAmbient},
     kDiffuse : {type: 'f', value: kDiffuse},
     kSpecular: {type: 'f', value: kSpecular},
     shininess : {type: 'f', value: shininess},
   },
})

var sphereTwoMaterial = new THREE.ShaderMaterial({
  uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type: 'f', value: kAmbient},
     kDiffuse : {type: 'f', value: kDiffuse},
     kSpecular: {type: 'f', value: kSpecular},
     shininess : {type: 'f', value: shininess},
   },
})

var sphereThreeMaterial = new THREE.ShaderMaterial({
  uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type: 'f', value: kAmbient},
     kDiffuse : {type: 'f', value: kDiffuse},
     kSpecular: {type: 'f', value: kSpecular},
     shininess : {type: 'f', value: shininess},
   },
})

var sphereFourMaterial = new THREE.ShaderMaterial({
  uniforms: {
     litColor : {type : 'c', value: litColor},
     unLitColor : {type : 'c', value: unLitColor},
     outlineColor : {type : 'c', value: outlineColor},
     lightPosition : {type: 'v3', value: lightPosition},
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type: 'f', value: kAmbient},
     kDiffuse : {type: 'f', value: kDiffuse},
   },
})

// LOAD SHADERS
var shaderFiles = [
  'glsl/example.vs.glsl',
  'glsl/example.fs.glsl',
  'glsl/gourad.vs.glsl',
  'glsl/gourad.fs.glsl',
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
  'glsl/blinnphong.vs.glsl',
  'glsl/blinnphong.fs.glsl',
  'glsl/cooltowarm.vs.glsl',
  'glsl/cooltowarm.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/gourad.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/gourad.fs.glsl'];
  armadilloMaterial.needsUpdate = true;
  sphereOneMaterial.vertexShader = shaders['glsl/gourad.vs.glsl'];
  sphereOneMaterial.fragmentShader = shaders['glsl/gourad.fs.glsl'];
  sphereOneMaterial.needsUpdate = true;
  sphereTwoMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
  sphereTwoMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
  sphereTwoMaterial.needsUpdate = true;
  sphereThreeMaterial.vertexShader = shaders['glsl/blinnphong.vs.glsl'];
  sphereThreeMaterial.fragmentShader = shaders['glsl/blinnphong.fs.glsl'];
  sphereThreeMaterial.needsUpdate = true;
  sphereFourMaterial.vertexShader = shaders['glsl/cooltowarm.vs.glsl'];
  sphereFourMaterial.fragmentShader = shaders['glsl/cooltowarm.fs.glsl'];
  sphereFourMaterial.needsUpdate = true;
})

// LOAD ARMADILLO
function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader()
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = floor;
    scene.add(object);

  }, onProgress, onError);
}


loadOBJ('obj/armadillo.obj', armadilloMaterial, 3, 0,3,-2, 0,Math.PI,0);

// CREATE SPHERES
var sphere = new THREE.SphereGeometry(1, 32, 32);

var gem_gouraud = new THREE.Mesh(sphere, sphereOneMaterial); // tip: make different materials for each sphere
gem_gouraud.position.set(-3, 1, -1);
scene.add(gem_gouraud);
gem_gouraud.parent = floor;

var gem_phong = new THREE.Mesh(sphere, sphereTwoMaterial);
gem_phong.position.set(-1, 1, -1);
scene.add(gem_phong);
gem_phong.parent = floor;

var gem_phong_blinn = new THREE.Mesh(sphere, sphereThreeMaterial);
gem_phong_blinn.position.set(1, 1, -1);
scene.add(gem_phong_blinn);
gem_phong_blinn.parent = floor;

var gem_toon = new THREE.Mesh(sphere, sphereFourMaterial);
gem_toon.position.set(3, 1, -1);
scene.add(gem_toon);
gem_toon.parent = floor;

// SETUP UPDATE CALL-BACK
var keyboard = new THREEx.KeyboardState();
function onKeyDown(event){
  if(keyboard.eventMatches(event, "1")){
    new THREE.SourceLoader().load(shaderFiles, function(shaders) {
      armadilloMaterial.vertexShader = shaders['glsl/gourad.vs.glsl'];
      armadilloMaterial.fragmentShader = shaders['glsl/gourad.fs.glsl'];
      armadilloMaterial.needsUpdate = true;
    });
  }else if (keyboard.eventMatches(event, "2")){
    new THREE.SourceLoader().load(shaderFiles, function(shaders) {
      armadilloMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
      armadilloMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
      armadilloMaterial.needsUpdate = true;
    });
  }else if (keyboard.eventMatches(event, "3")){
    new THREE.SourceLoader().load(shaderFiles, function(shaders) {
      armadilloMaterial.vertexShader = shaders['glsl/blinnphong.vs.glsl'];
      armadilloMaterial.fragmentShader = shaders['glsl/blinnphong.fs.glsl'];
      armadilloMaterial.needsUpdate = true;
    });
  }else if (keyboard.eventMatches(event, "4")){
    new THREE.SourceLoader().load(shaderFiles, function(shaders) {
      armadilloMaterial.vertexShader = shaders['glsl/cooltowarm.vs.glsl'];
      armadilloMaterial.fragmentShader = shaders['glsl/cooltowarm.fs.glsl'];
      armadilloMaterial.needsUpdate = true;
    });
  }
}
keyboard.domElement.addEventListener('keydown',onKeyDown);
var render = function() {
 // tip: change armadillo shading here according to keyboard




 requestAnimationFrame(render);
 renderer.render(scene, camera);
}

render();