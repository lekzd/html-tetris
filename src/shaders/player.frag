precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
    vec4 textureColor = texture2D(uSampler, vTextureCoord);

    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
}
