
/**
 * 初始化事件范围
 * @param scene  场景对象
 */
function initCircle(scene: any) {
  const circle = new AMap.Circle({
    center: [104.069738, 30.715603],
    radius: 1000, //半径
    borderWeight: 3,
    strokeColor: '#FF33FF',
    strokeOpacity: 1,
    strokeWeight: 6,
    strokeOpacity: 0.2,
    fillOpacity: 0.4,
    strokeStyle: 'dashed',
    strokeDasharray: [10, 10],
    // 线样式还支持 'dashed'
    fillColor: '#1791fc',
    zIndex: 100,
  })

  circle.setMap(scene.map)

  var circleEditor = new AMap.CircleEditor(scene.map, circle)

  circleEditor.on('move', function (event) {
    console.log('触发事件：move')
  })

  circleEditor.on('adjust', function (event) {
    console.log('触发事件：adjust')
  })

  circleEditor.on('end', function (event) {
    console.log('触发事件： end')
    // event.target 即为编辑后的圆形对象
  })

  circleEditor.open()
}