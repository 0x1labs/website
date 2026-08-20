type Point = { x: number; y: number }

export type BinaryTerrain = {
  setProgress: (progress: number) => void
  setPointer: (point: Point) => void
  resize: () => void
  dispose: () => void
}

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;

  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageSize;
  uniform vec2 u_pointer;
  uniform float u_progress;
  varying vec2 v_uv;

  float bayer(vec2 p) {
    vec2 q = mod(floor(p), 4.0);
    float i = q.x + q.y * 4.0;
    if (i == 0.0) return 0.0 / 16.0;
    if (i == 1.0) return 8.0 / 16.0;
    if (i == 2.0) return 2.0 / 16.0;
    if (i == 3.0) return 10.0 / 16.0;
    if (i == 4.0) return 12.0 / 16.0;
    if (i == 5.0) return 4.0 / 16.0;
    if (i == 6.0) return 14.0 / 16.0;
    if (i == 7.0) return 6.0 / 16.0;
    if (i == 8.0) return 3.0 / 16.0;
    if (i == 9.0) return 11.0 / 16.0;
    if (i == 10.0) return 1.0 / 16.0;
    if (i == 11.0) return 9.0 / 16.0;
    if (i == 12.0) return 15.0 / 16.0;
    if (i == 13.0) return 7.0 / 16.0;
    if (i == 14.0) return 13.0 / 16.0;
    return 5.0 / 16.0;
  }

  void main() {
    vec2 screen = u_resolution;
    float screenRatio = screen.x / screen.y;
    float imageRatio = u_imageSize.x / u_imageSize.y;
    vec2 scale = imageRatio > screenRatio
      ? vec2(screenRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / screenRatio);

    vec2 uv = (v_uv - 0.5) * scale + 0.5;
    float wave = sin((uv.y * 10.0) + (u_progress * 4.0)) * 0.0035;
    uv.x += wave + (u_pointer.x - 0.5) * 0.012;
    uv.y += (u_pointer.y - 0.5) * 0.008;

    vec3 colour = texture2D(u_image, uv).rgb;
    float luminance = dot(colour, vec3(0.299, 0.587, 0.114));
    float threshold = mix(0.34, 0.62, smoothstep(0.0, 1.0, u_progress));
    float grain = (bayer(gl_FragCoord.xy) - 0.5) * mix(0.28, 0.12, u_progress);
    float ink = step(threshold + grain, luminance);
    gl_FragColor = vec4(vec3(ink), 1.0);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Unable to create WebGL shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Unknown WebGL shader error'
    gl.deleteShader(shader)
    throw new Error(message)
  }
  return shader
}

export async function createBinaryTerrain(
  canvas: HTMLCanvasElement,
  imageUrl: string,
  onReady?: () => void,
): Promise<BinaryTerrain | null> {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'high-performance',
  })

  if (!gl) return null

  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? 'Unable to link WebGL program')
  }

  const buffer = gl.createBuffer()
  const texture = gl.createTexture()
  if (!buffer || !texture) return null

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  gl.useProgram(program)
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  const imageSizeLocation = gl.getUniformLocation(program, 'u_imageSize')
  const progressLocation = gl.getUniformLocation(program, 'u_progress')
  const pointerLocation = gl.getUniformLocation(program, 'u_pointer')

  const image = new Image()
  image.decoding = 'async'
  image.src = imageUrl
  await image.decode()

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  gl.uniform2f(imageSizeLocation, image.naturalWidth, image.naturalHeight)

  let progress = 0
  let pointer: Point = { x: 0.5, y: 0.5 }
  let frame = 0
  let disposed = false

  const draw = () => {
    frame = 0
    if (disposed || gl.isContextLost()) return
    gl.uniform1f(progressLocation, progress)
    gl.uniform2f(pointerLocation, pointer.x, pointer.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const invalidate = () => {
    if (!frame && !disposed) frame = window.requestAnimationFrame(draw)
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.1 : 1.5)
    const width = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const height = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform2f(resolutionLocation, width, height)
    }
    invalidate()
  }

  resize()
  onReady?.()

  return {
    setProgress(nextProgress) {
      progress = Math.min(1, Math.max(0, nextProgress))
      invalidate()
    },
    setPointer(nextPointer) {
      pointer = nextPointer
      invalidate()
    },
    resize,
    dispose() {
      disposed = true
      if (frame) window.cancelAnimationFrame(frame)
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    },
  }
}
