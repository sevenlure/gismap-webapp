export function metersPerPixel(latitude, zoomLevel) {
  var earthCircumference = 40075016.686
  var latitudeRadians = latitude * (Math.PI / 180)
  return (earthCircumference * Math.abs(Math.cos(latitudeRadians))) / Math.pow(2, zoomLevel + 8)
}

export function pixelValue(latitude, meters, zoomLevel) {
  return meters / metersPerPixel(latitude, zoomLevel)
}
