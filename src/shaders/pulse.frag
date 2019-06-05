#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float time;
uniform sampler2D uSampler;
out vec4 color;

void main(void) {
    float timeFactor = sin(time);

    vec3 textureColor = texture(uSampler, vTextureCoord).rgb;

    color = vec4(textureColor, timeFactor);
}
