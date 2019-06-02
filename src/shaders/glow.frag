#version 300 es
precision mediump float;

/**
------------ one pass glow shader ------------
    author: Richman Stewart
    applies a gaussian glow horizontally and vertically
    behind the original texture
------------------ use ------------------------
    glow_size - defines the spread x and y
    glow_colour - the colour of the glow
    glow_intensity - glow intensity
**/

in vec2 vTextureCoord;

uniform sampler2D uSampler;

out vec4 pixel;

void main() {
    float glow_size = .5;
    vec3 glow_colour = vec3(1.0, 1.0, 1.0);
    float glow_intensity = 1.0;
    float glow_threshold = 1.0;

    pixel = texture(uSampler, vTextureCoord);

    if (pixel.a <= glow_threshold) {
        ivec2 size = textureSize(uSampler, 0);

        float uv_x = vTextureCoord.x * float(size.x);
        float uv_y = vTextureCoord.y * float(size.y);

        float sum = 0.0;

        for (float n = 0.0; n < 9.0; ++n) {
            uv_y = (vTextureCoord.y * float(size.y)) + (glow_size * float(n - 4.5));

            float h_sum = 0.0;

            h_sum += texelFetch(uSampler, ivec2(uv_x - (4.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x - (3.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x - (2.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x - glow_size, uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x, uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x + glow_size, uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x + (2.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x + (3.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(uSampler, ivec2(uv_x + (4.0 * glow_size), uv_y), 0).a;

            sum += h_sum / 9.0;
        }

        pixel = vec4(glow_colour, (sum / 9.0) * glow_intensity);
    }
}
