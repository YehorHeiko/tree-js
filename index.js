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

// Визуализируем сцену
camera.position.z = 4

// Делаем рендер
const renderer = new TREE.WebGLRenderer()
// задаем размеры рендера
renderer.setSize(window.innerWidth, window.innerHeight)
// Добавляем рендер в документ
document.body.appendChild(renderer.domElement)
// Задавляем цвет геометрию
const geomertry = new TREE.BoxGeometry()
// Выбираем материал
const material = new TREE.MeshBasicMaterial({
    color: 'orange',
})
// Создаем куб
const cube = new TREE.Mesh(geomertry, material)
// Добавляем куб в сцену
scene.add(cube)
// Фнкция анимации
function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.001
    cube.rotation.y += 0.001

    renderer.render(scene, camera)
}
// Вызов функции
animate()