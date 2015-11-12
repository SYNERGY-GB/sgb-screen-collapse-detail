<h1>SGB-screen-collapse-detail</h1>

<h3>Propósito</h3>

Esta pantalla es una vista detallada de un elemento proveniente de una lista, que se caracterisa por tener opciones colapsables entre si. 

<h3>Datos esperados</h3>

Los datos se deben se reciben mediante un Json.

<h3>Datos obligatorios</h3>

- **image**: url de la imagen.
- **title**: títutlo del ítem.
- **description**: descripcion ampliada del ítem.

<h3>Datos opcionales</h3>
    
-**iconPlusOutline**: url del simbolo "+" utilizado por la lista   
-**iconMinusOutline**: url del simbolo "-" utilizado por la lista
-**collapseSubtitle**: titulo de la opcion collapse.                             
-**collapseDescription**: descripcion de la opcion collapse.
        
    
<h3>Ejemplo JSON</h3>

data =
    {
        "image": "css/Untitled-1-02.svg",
        "title" : "Conectate a la Velocidad de tu imaginacion",
        "icon"  : "icon ion-iphone",
        "description":"En telecomunicaciones, 4G son las siglas utilizadas para referirse a la cuarta generación de tecnologías de telefonía móvil. Es la sucesora de las tecnologías 2G y 3G, y que precede a la próxima generación, la 5G.",
        "collapse" : [ 
                        {   
                            "iconPlusOutline":"  ion-android-add-circle ",
                            "iconMinusOutline":" ion-android-remove-circle ",
                            "collapseSubtitle":"Como Funciona?",
                            "collapseDescription":'La tecnología 4G está basada completamente en el protocolo IP, siendo un sistema de sistemas y una red de redes, que se alcanza gracias a la convergencia entre las redes de cables e inalámbricas. Esta tecnología podrá ser usada por módems inalámbricos, smartphones y otros dispositivos móviles.'
                        },

                        {   
                            "iconPlusOutline":"  ion-android-add-circle ",
                            "iconMinusOutline":" ion-android-remove-circle ",
                            "collapseSubtitle":"Por que me Conviene?",
                            "collapseDescription":'La tecnología 4G está basada completamente en el protocolo IP, siendo un sistema de sistemas y una red de redes, que se alcanza gracias a la convergencia entre las redes de cables e inalámbricas. Esta tecnología podrá ser usada por módems inalámbricos, smartphones y otros dispositivos móviles.'
                        },

                        {   
                            "iconPlusOutline":"  ion-android-add-circle ",
                            "iconMinusOutline":" ion-android-remove-circle ",
                            "collapseSubtitle":"Donde lo encuentro?",
                            "collapseDescription":'La tecnología 4G está basada completamente en el protocolo IP, siendo un sistema de sistemas y una red de redes, que se alcanza gracias a la convergencia entre las redes de cables e inalámbricas. Esta tecnología podrá ser usada por módems inalámbricos, smartphones y otros dispositivos móviles.'
                        }
                     
                    ]
    };

 

<h3>Diseño</h3>

![Alt Text](https://s3.amazonaws.com/megazord-framework/balsamiq+mockups/sgb-screen-collase-detail.png)