varying vec3 interpolatedNormal;
varying vec3 interpolatedPosition;
varying vec3 eyeVector;

void main() {
    interpolatedNormal = normalize(vec3(normalMatrix * normal));
    interpolatedPosition = vec3(modelViewMatrix*vec4(position, 1.0));
    eyeVector = -vec3(modelViewMatrix * vec4(position, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}



//varying in phong  =  itnerpolatednormal, interpolated position, eye vector