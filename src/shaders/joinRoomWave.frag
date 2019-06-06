#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float time;
uniform sampler2D uSampler;
out vec4 color;

vec4 wave(float offsetFactor, float timeFactor) {
    vec4 color = vec4(0.0);
    float yFactor = distance(vec2(.5 + timeFactor, .5 + (timeFactor / 2.0)), vTextureCoord) * 2.0;//

    float distanceFactor = abs(vTextureCoord.y - (sin((vTextureCoord.x * 20.0 + offsetFactor) + timeFactor + offsetFactor) / 50.0) - 0.3 - offsetFactor);

    if (distanceFactor < 0.002) {
        color = vec4(yFactor, 0.9 - yFactor, 1.5 - yFactor, 1.0) * 0.2;
    }

    return color;
}

void main(void) {
    float timeFactor = (sin(time / 10.0) - .5) * .5; // -0.7 — 0.3;

    vec3 textureColor = texture(uSampler, vTextureCoord).rgb;

    if (textureColor.r > 0.1) {
        float yFactor = distance(vec2(.5 + timeFactor, .5 + (timeFactor / 2.0)), vTextureCoord) * 2.0;//
        vec3 posColor = vec3(yFactor, 0.9 - yFactor, 1.5 - yFactor) * (textureColor.r / .5);

        color = vec4(posColor, 1.0);

        return;
    }

    color += wave(0.0, timeFactor);

//    color = starSystem(0.2);

//    for (float i = -0.7; i < 0.3; i += 0.1) {
//        if (isPeriod(timeFactor, i)) {
//            color = starSystem(i);
//        }
//    }


//    discard;
}
