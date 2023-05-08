import * as THREE from 'three'
import { Box3 } from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight, false)
renderer.domElement.classList.add('canvas')
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)

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
  camera.aspect = window.innerWidth / window.innerHeight
  camera.fov = 2 * Math.atan(Math.tan(20) / (16 / 10 * camera.aspect)) * 180 / Math.PI
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth * 2, window.innerHeight * 2, false)
})