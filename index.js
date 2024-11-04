import * as TREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Добавляем сцену
const scene = new TREE.Scene()
// Добавляем камеру
const camera = new TREE.PerspectiveCamera(
    // Начальная глубина
    75,
    // Ширина и высота
    window.innerWidth / window.innerHeight,
    // Размер области видимости к 1 обьекту
    0.1,
    // Размер области видимости к 2 обьекту
    100,
)

// свет

// const spot = new TREE.SpotLight('red', 100)
// spot.position.set(3, 1, 1)
// scene.add(spot)

// const pointlight = new TREE.PointLight('white', 100, 1000)
// pointlight.position.set(3, 1, 1)

// scene.add(pointlight)

// const helper = new TREE.PointLightHelper(pointlight)
// scene.add(helper)

const light = new TREE.AmbientLight(0xffffff, 1)

scene.add(light)

const direlite = new TREE.DirectionalLight(0xffffff, 30)

direlite.position.set(5, 5, 5)

scene.add(direlite)
// текстура

// const texture = new TREE.TextureLoader().load('./3d/image.png')
// const textureMaterial = new TREE.MeshBasicMaterial({
//     map: texture
// })

// const plane = new TREE.Mesh(
//     new TREE.PlaneGeometry(1,1),
//     textureMaterial
//     )

// plane.position.set(-2, -2, 0)
// scene.add(plane)

// Визуализируем сцену
camera.position.z = 4

// Делаем рендер
const renderer = new TREE.WebGLRenderer()
// задаем размеры рендера
renderer.setSize(window.innerWidth, window.innerHeight)

// Добавляем рендер в документ
document.body.appendChild(renderer.domElement)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 2
controls.maxDistance = 10

// Задавляем цвет геометрию
const geomertry = new TREE.BoxGeometry(1, 1, 1)
// Выбираем материал
const material = new TREE.MeshStandardMaterial({
    color: 'rgb(37, 32, 47)',
})

const originalMaterial = new TREE.MeshStandardMaterial({
    color: 'red',
})
const hilightMaterial = new TREE.MeshStandardMaterial({
    color: 'yellow',
    emissive: 'white',
    emissiveIntensity: 0.5,
})
// Создаем куб
const cube = new TREE.Mesh(geomertry, originalMaterial)

cube.position.set(0, 0, 0)

// Добавляем куб в сцену
scene.add(cube)


// GSAB



// gsap.to(cube.position, {
//     y: 2,
//     x: 1,
//     duration: 1,
//     ease: 'power1.inOut',
//     repeat : -1,
//     yoyo: true
// })

const raycast = new TREE.Raycaster()
const mouse = new TREE.Vector2()

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

}

window.addEventListener('mousemove', onMouseMove)

let isHoverd = false


// const sphereGeometry = new TREE.SphereGeometry(0.5, 6, 6)
// const sphereMaterial = new TREE.MeshBasicMaterial({
//     color: 'blue',
//     emissive: 'white',
//     shininess: 100,
// })


// const sphere = new TREE.Mesh(sphereGeometry, sphereMaterial)
// sphere.position.set(2, 0, 0)


// const ponhick = new TREE.Mesh(
//     new TREE.TorusGeometry(0.5, 0.2, 18, 100),
//     new TREE.MeshBasicMaterial({
//         color: 'white',
//     })
// ) 

// ponhick.position.set(0, 2, 0)

// scene.add(ponhick)

// scene.add(sphere)

// Фнкция анимации
function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.002
    // cube.rotation.y += 0.002

    raycast.setFromCamera(mouse, camera)

    const intersect = raycast.intersectObject(cube)
    if (intersect.length > 0 && !isHoverd) {
        cube.material = hilightMaterial
        isHoverd = true

        gsap.to(cube.scale, {
            x: 1.5,
            y: 1.5,
            duration: 1.5,
            ease: 'power1.inOut',
        })
    }
    else if (intersect.length === 0 && isHoverd) {
        cube.material = originalMaterial
        isHoverd = false
        gsap.to(cube.scale, {
            x: 1,
            y: 1,
            duration: 1.5,
            ease: 'power1.inOut',
        })
    }

    controls.update()

    renderer.render(scene, camera)
}

// Вызов функции
animate()


