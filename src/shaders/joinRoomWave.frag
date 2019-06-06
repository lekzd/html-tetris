#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float time;
uniform sampler2D uSampler;
out vec4 color;

vec4 star(float x, float y) {
    float dist = distance(vTextureCoord, vec2(x, y));
    float xDiff = abs(vTextureCoord.x - x);
    float yDiff = abs(vTextureCoord.y - y);

    if (dist < .05) {
        if (xDiff < .001) {
            return vec4((.05 - dist) * 20.0);
        }
        if (yDiff < .001) {
            return vec4((.05 - dist) * 20.0);
        }
    }

    return vec4(0.0);
}

vec4 starSystem(float factor) {
    vec4 res = vec4(0.0);

    for (float i = 0.0; i < 6.0; i++) {
        res += star(abs(sin(factor / i)) - .5, abs(cos(factor / i)) - 0.5);
    }

    return res;
}

bool isPeriod(float timeFactor, float target) {
    return abs(timeFactor - target) < .02;
}

void main(void) {
    float timeFactor = (sin(time / 10.0) - .5) * .5; // -0.7 — 0.3;

    vec3 textureColor = texture(uSampler, vTextureCoord).rgb;

    if (textureColor.r > 0.1) {
        float yFactor = (vTextureCoord.x + timeFactor) * 2.0;
        vec3 posColor = vec3(yFactor, 1.0 - yFactor, 0.5 - yFactor) * (textureColor.r / .5);

        color = vec4(posColor, 1.0);

        return;
    }

    for (float i = -0.7; i < 0.3; i += 0.1) {
        if (isPeriod(timeFactor, i)) {
            color = starSystem(i);
        }
    }


//    discard;
}
