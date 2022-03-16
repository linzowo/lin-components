/**
  * 雷达波1
  * @param scene  场景对象
  */
function initWaveAnimate1(scene: any) {
  const { map } = scene
  const circular = new AMap.Circle({
    map,
    center: map.getCenter(),
    radius: 50,
    strokeColor: '#7B1400',
    strokeOpacity: 0.1,
    strokeWeight: 100,
    fillColor: '#7B1422',
    fillOpacity: 0.2,
  })

  map.add(circular)

  let scaleValue = 10

  function scan() {
    circular.setRadius(scaleValue)
    scaleValue += 10
    if (scaleValue >= 1000) {
      scaleValue = 10
      // radar.setScale(0.1, 0.1, 0.1)
    }
    AMap.Util.requestAnimFrame(scan)
  }

  scan()

  // console.log(radar.scale(2, 2, 2))
}

/**
* 雷达波2
* @param scene  场景对象
*/
function initWaveAnimate2(scene: any) {
  object3Dlayer = new AMap.Object3DLayer({
    zIndex: 110,
    opacity: 1,
  })

  const { map } = scene

  map.add(object3Dlayer)

  let radar
  const buildRadar = function () {
    radar = new AMap.Object3D.Mesh()
    radar.transparent = true
    radar.backOrFront = 'front'

    const geometry = radar.geometry
    let radius = 10 // 米
    radius = radius / map.getResolution(map.getCenter(), 20)
    const unit = 1
    // 不加1会有一个缺口
    const range = 360 + 1
    const count = range / unit

    console.log(geometry)

    for (let i = 0; i < count; i += 1) {
      const angle1 = (i * unit * Math.PI) / 180
      const angle2 = ((i + 1) * unit * Math.PI) / 180

      const p1x = Math.cos(angle1) * radius
      const p1y = Math.sin(angle1) * radius
      const p2x = Math.cos(angle2) * radius
      const p2y = Math.sin(angle2) * radius

      // 构建顶点
      geometry.vertices.push(0, 0, 0)
      geometry.vertices.push(p1x, p1y, 0)
      geometry.vertices.push(p2x, p2y, 0)

      // 根据顶点确定面
      geometry.faces.push(i + 2, i + 1, i + 4)
      geometry.faces.push(i + 362, i + 361, i + 364)
      geometry.faces.push(i + 722, i + 721, i + 724)

      // 为面填充纹理颜色
      geometry.vertexColors.push(0.01, 1, 0.73, 0)
      geometry.vertexColors.push(0.01, 1, 0.73, 0.06)
      geometry.vertexColors.push(0.01, 1, 0.73, 0.09)
    }

    radar.position(map.getCenter())

    object3Dlayer.add(radar)
  }

  function getOpacity(scale) {
    return 1 - Math.pow(scale, 0.3)
  }

  let scaleValue = 1

  function scan() {
    // radar.rotateZ(-2)
    /*
    rotateX: ƒ (a)
    rotateY: ƒ (a)
    rotateZ: ƒ (a)
    scale: ƒ (a,b,c)
    setRotate: ƒ (a,b,c,d)
    setScale: ƒ (a,b,c)
    */
    radar.setScale(scaleValue, scaleValue, scaleValue)
    scaleValue += radarWaveRadius / 1000
    if (scaleValue >= radarWaveRadius / 10) {
      scaleValue = 1
      // radar.setScale(0.1, 0.1, 0.1)
    }
    AMap.Util.requestAnimFrame(scan)
  }

  buildRadar()
  scan()

  // console.log(radar.scale(2, 2, 2))
}