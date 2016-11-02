varying vec3 interpolatedNormal;
varying vec3 interpolatedPosition;
varying vec3 eyeVector;

uniform vec3 lightPosition;
uniform vec3 litColor;
uniform vec3 unLitColor;
uniform vec3 outlineColor;

uniform vec3 lightColor;
uniform vec3 ambientColor;

uniform float kAmbient;
uniform float kDiffuse;


void main() {

	vec3 l = normalize(lightPosition - interpolatedPosition);
    float lDotN = max( dot(interpolatedNormal, l), 0.0 );

    vec3 v = normalize(eyeVector - interpolatedPosition);
    float nDotV = max(dot(interpolatedNormal, v),0.0);

    vec3 cColor = normalize(vec3(0.0,0.0,0.7));
    

    vec3 ambient = kAmbient * normalize(unLitColor); 

	float warmthConstant = ((1.0 + lDotN) * 0.5);
	


	vec3 warmColor = warmthConstant * normalize(litColor);
	vec3 coldColor = (1.0 - warmthConstant) * normalize(cColor);

	vec3 diffuse = warmColor + coldColor;
    vec3 color =  ambient + diffuse;

    if (nDotV < 0.3){
   	 color = vec3(outlineColor);
	}

	gl_FragColor = vec4(color, 1.0);
}
