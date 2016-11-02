varying vec3 color;

uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform vec3 ambientColor;

uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

void main(){
    vec3 l = normalize(lightPosition - position);
    vec3 vertexNormal = normalize(vec3(normalMatrix * normal));
    float lDotN = max( dot( l, vertexNormal ), 0.0 );

	vec3 diffuse = vec3(lightColor * kDiffuse * lDotN);
	
	
 
	vec3 ambient = kAmbient * ambientColor; 
 
	vec3 eyeVector = -vec3(modelViewMatrix*vec4(position, 1.0));
	vec3 v = normalize(eyeVector - position);

	vec3 r = reflect(-l, vertexNormal);
	
 	
	
	float rDotV = max(dot(v,r), 0.0);

	vec3 specular = vec3(lightColor * kSpecular * pow(rDotV, shininess));

    color = vec3(ambient + diffuse + specular);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

//varying in phong  =  itnerpolatednormal, interpolated position, eye vector
//light position in view coordinates, 
// cameraposition in wolrd coordinates
// normal is in local coordinates
//Colors are type 'c' in JavaScript and passed into shaders as vec3. K values are type 'f' in JavaScript and passed into shaders as uniform float.

// LIGHTING UNIFORMS
//var lightColor = new THREE.Color(1,1,1);
//var ambientColor = new THREE.Color(0.4,0.4,0.4);
//var lightPosition = new THREE.Vector3(70,100,70);

//var litColor = new THREE.Color(0.3,0.4,0.6);
//var unLitColor = new THREE.Color(0.15,0.2,0.3);
//var outlineColor = new THREE.Color(0.04,0.1,0.15);

//var litArmadilloColor = new THREE.Color(0.15,0.6,0.3);
//var unLitArmadilloColor = new THREE.Color(0.04,0.3,0.15);

//var kAmbient = 0.4;
//var kDiffuse = 0.8;
//var kSpecular = 0.8;
//var shininess = 10.0;
//var toneBalance = 0.5;