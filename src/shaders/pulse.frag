#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float time;
uniform sampler2D uSampler;
out vec4 color;

void main(void) {
    float timeFactor = sin(time);

    color = texture(uSampler, vTextureCoord) + vec4(timeFactor, timeFactor, timeFactor, 1.0);
}
