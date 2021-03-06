#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uSampler;
out vec4 color;

void main(void) {
    vec4 textureColor = texture(uSampler, vTextureCoord);

    color = vec4(1.0, 0.0, 0.0, 0.5);
}
