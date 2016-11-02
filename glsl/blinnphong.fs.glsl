varying vec3 interpolatedNormal;
varying vec3 interpolatedPosition;
varying vec3 eyeVector;

uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform vec3 ambientColor;

uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

void main() {

	vec3 l = normalize(lightPosition - interpolatedPosition);
    float lDotN = max( dot( l, interpolatedNormal), 0.0 );

	vec3 diffuse = vec3(lightColor * kDiffuse * lDotN);
 
	vec3 ambient = kAmbient * ambientColor; 
 
	//vec3 eyeVector = -vec3(modelViewMatrix*vec4(position, 1.0));
	vec3 v = normalize(eyeVector - interpolatedPosition);

	vec3 r = reflect(-l, interpolatedNormal);
	
 	vec3 h = vec3(0.5*(l+v));
 	float hDotN = max(0.0, dot(h,interpolatedNormal));
	
	//float rDotV = max(dot(v,r), 0.0);

	vec3 specular = vec3(lightColor * kSpecular * pow(hDotN, shininess));

    vec3 color = vec3(ambient  + diffuse + specular);

	gl_FragColor = vec4(color, 1.0);
}

// instead of dotproduct(reflected light vector & viewer)
// use dot product of halfway vector (b/t light and viewing direction)
// and surface normal 

//specular =  ks * (h dot n)^shineness * Ilight
// h = l +v /2