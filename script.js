/* minecraft animated terrain */

const canvas = document.getElementById("mc-bg")

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.set(0,5,10)

const light = new THREE.DirectionalLight(0xffffff,1)

light.position.set(5,10,5)

scene.add(light)

const loader = new THREE.TextureLoader()

const grass = loader.load("https://i.imgur.com/8yKXsgF.png")

const material = new THREE.MeshLambertMaterial({map:grass})

for(let x=-10;x<=10;x++){
for(let z=-10;z<=10;z++){

const block = new THREE.Mesh(
new THREE.BoxGeometry(1,1,1),
material
)

block.position.set(x,-1,z)

scene.add(block)

}
}

function animate(){

requestAnimationFrame(animate)

camera.position.x = Math.sin(Date.now()*0.0004)*8

camera.lookAt(0,0,0)

renderer.render(scene,camera)

}

animate()



/* minecraft player */

const viewer = new skinview3d.SkinViewer({
canvas: document.getElementById("player"),
width:300,
height:400,
skin:"images/skin.png"
})

viewer.animation = new skinview3d.WalkingAnimation()

document.getElementById("player").addEventListener("click",()=>{

viewer.animation = new skinview3d.SwingAnimation()

setTimeout(()=>{
viewer.animation = new skinview3d.WalkingAnimation()
},800)

})



/* youtube thumbnails */

async function loadVideos(){

const res = await fetch(
"https://yt.lemnoslife.com/noKey/search?part=snippet&channelId=UCmGQrmdnM5uyknkDQt1YNzw&maxResults=6&order=date"
)

const data = await res.json()

const container = document.getElementById("video-container")

data.items.forEach(v=>{

const img = document.createElement("img")

img.src = v.snippet.thumbnails.medium.url

img.onclick = ()=>{

window.open("https://youtube.com/watch?v="+v.id.videoId)

}

container.appendChild(img)

})

}

loadVideos()
