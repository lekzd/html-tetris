#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uSampler;
out vec4 color;

void main(void) {
    color = vec4(1.0, 0.0, 0.0, 1.0);
}
