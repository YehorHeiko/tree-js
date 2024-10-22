import * as TREE from 'three'

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

const spot = new TREE.SpotLight(0xffffff, 100)
spot.position.set(3, 1, 1)
scene.add(spot)

// const pointlight = new TREE.PointLight('white', 100, 1000)
// pointlight.position.set(3, 1, 1)

// scene.add(pointlight)

// const helper = new TREE.PointLightHelper(pointlight)
// scene.add(helper)

// const light = new TREE.AmbientLight(0xffffff, 1)

// scene.add(light)

// const direlite = new TREE.DirectionalLight(0xffffff, 30)

// direlite.position.set(5, 5, 5)

// scene.add(direlite)
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
// Задавляем цвет геометрию
const geomertry = new TREE.BoxGeometry(1, 1, 1)
// Выбираем материал
const material = new TREE.MeshStandardMaterial({
    color: 'rgb(37, 32, 47)',
})
// Создаем куб
const cube = new TREE.Mesh(geomertry, material)

cube.position.set(0, 0, 0)

// Добавляем куб в сцену
scene.add(cube)



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

    cube.rotation.x += 0.001
    cube.rotation.y += 0.001

    renderer.render(scene, camera)
}

// Вызов функции
animate()


