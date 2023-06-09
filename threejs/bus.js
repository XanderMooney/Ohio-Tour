import * as THREE from 'three'
import { Box3 } from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const light = new THREE.AmbientLight('0xffffff')
scene.add(light);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / (window.innerHeight / 2), 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight / 2, false)
renderer.domElement.classList.add('canvas')
renderer.outputEncoding = THREE.sRGBEncoding
document.getElementById('busLocation').appendChild(renderer.domElement)

const loader = new GLTFLoader()
let vector;
loader.load('models/japanese_bus_nagoya_city_bus_aichi/scene.gltf', function(gltf) {
  const model = gltf.scene
  scene.add(model)

  const box3 = new Box3().setFromObject(gltf.scene)
  vector = new THREE.Vector3()
  box3.getCenter(vector)
  model.position.set(-vector.x, -vector.y, -vector.z)

  animate()
}, undefined, function(error) {
  console.log(error)
});

let radius = 8;
let time = 0;
let clock = new THREE.Clock()
function animate() {

  time += clock.getDelta() / 9

  camera.position.x = Math.sin(time) * radius
  camera.position.z = Math.cos(time) * radius
  camera.lookAt(0, 0, 0)

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

addEventListener("resize", () => {
  camera.aspect = window.innerWidth / (window.innerHeight / 2)
  convertFov(50, window.innerWidth, window.innerHeight / 2)
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight / 2, false)
})

// Thanks to Jack Kennedy for this lovely repsonsiveness
function convertFov(fov, vw, vh) {
  const DEVELOPER_SCREEN_ASPECT_RATIO_HEIGHT = 10;
  const DEVELOPER_SCREEN_ASPECT_RATIO_WIDTH = 16;
  
  return (
      (Math.atan(Math.tan((fov * Math.PI) / 360) / ((DEVELOPER_SCREEN_ASPECT_RATIO_HEIGHT / DEVELOPER_SCREEN_ASPECT_RATIO_WIDTH) * (vw / vh))) *
          360) /
      Math.PI
  );
}