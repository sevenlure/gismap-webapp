const default_color = [
  '#7cb5ec',
  '#434348',
  '#90ed7d',
  '#f7a35c',
  '#8085e9',
  '#f15c80',
  '#e4d354',
  '#2b908f',
  '#f45b5b',
  '#91e8e1'
]

const default_color_buffer = ['#3388ff', '#fadb14', '#fa8c16', '#fa541c']

export function getColorByIndex(index) {
  return default_color[index % 10]
}

export function getColorBufferByIndex(index) {
  return default_color_buffer[index]
}
