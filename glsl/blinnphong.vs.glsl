varying vec3 interpolatedNormal;
varying vec3 interpolatedPosition;
varying vec3 eyeVector;

void main() {
    interpolatedNormal = normalize(vec3(normalMatrix * normal));
    interpolatedPosition = vec3(modelViewMatrix*vec4(position, 1.0));
    eyeVector = -vec3(modelViewMatrix * vec4(position, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// instead of dotproduct(reflected light vector & viewer)
// use dot product of halfway vector (b/t light and viewing direction)
// and surface normal 