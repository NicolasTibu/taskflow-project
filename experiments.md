# Registro de Experimentos

## Introducción 
Este espacio está dedicado a la bitácora de pruebas técnicas. Cada sección documentará un experimento específico, la hipótesis de partida, el procedimiento seguido y los resultados obtenidos.

## Experimento #1: Conexión de Servidores MCP en Cursor
* **Objetivo:** Configurar el Model Context Protocol (MCP) para otorgar a la IA de Cursor capacidades de lectura y exploración del sistema de archivos local.
* **Resultado:** Éxito

### Procedimiento de Instalación (Interfaz de Cursor)

A diferencia de las extensiones tradicionales, la configuración de MCP se realiza directamente en el núcleo del editor:

1.  **Acceso a Configuración:** Se abrió el panel de **Cursor Settings** (icono de engranaje en la esquina superior derecha o atajo `Cmd/Ctrl + Shift + J`).
2.  **Sección de Funciones:** En el menú lateral izquierdo, se seleccionó la opción **"Features"**.
3.  **Registro del Servidor:**
    * Se localizó el apartado **"MCP Servers"**.
    * Se hizo clic en **"+ Add New MCP Server"**.
4.  **Configuración Técnica:**
    * **Name:** `Local-Filesystem`
    * **Type:** `command`
    * **Command:** `npx -y @modelcontextprotocol/server-filesystem "RUTA_ABSOLUTA_DE_TU_PROYECTO"`
    *(Nota: Es crucial usar la ruta absoluta para que el proceso npx sepa dónde trabajar).*

### Resultados y Comprobación
* **Estado de Conexión:** Tras guardar, el panel de Cursor mostró el estado **"Connected"** con un indicador verde.
* **Prueba de Interacción:** Se utilizó el Chat de Cursor (`Ctrl + L`) para solicitar un análisis de la estructura de carpetas. La IA invocó automáticamente la herramienta `list_directory` para obtener datos reales del disco.

### Conclusión
La implementación de MCP dentro de Cursor elimina la limitación de "visión parcial" de la IA. Ahora, el modelo puede navegar por archivos que no están abiertos en pestañas, facilitando refactorizaciones globales y auditorías de estructura en tiempo real.

## Experimento #2: Experimentos con IA en programación

* **Objetivo:** Elegir tres problemas de programacion e intentar solucionarlos sin la ayuda de la IA y despues resorverlos con la IA

**1. Contador interactivo:**

**Turno de la persona:** Este es el primer problema, como el nombre indica tenia que hacer un contador interactivo, por desgracia me ha costado mucho ya que hace tiempo que no he usado la programacion, pero con estas practicas me devolveran las habilidades y esperemos que en el futuro no tenga estos problemas. 

**Turno de la IA:** La IA obviamente no le ha costado hacer el contador, el código estaba mucho mejor hecho y estructurado en comparación con el mío. Por una parte positiva esto me ayuda a ver como se hace el código. 

**2. Lista de tareas:** 

**Turno de la persona:** Por suerte como hice el task flow esta vez no me ha dado tantas complicaciones como el contador, aunque he tardado un tiempo haciendo el código. 

**Turno de la IA:** La IA otra vez vuelve a salir victorioso por lo bien estructurado que esta su código, obviamente no ha tardado tanto en hacer el código como yo. Pero al final tiene ventaja ya que es una máquina que almacena informacion del Internet.

**3. Interruptor día/noche:** 

**Turno de la persona:** Aqui hemos salido empates ya que yo hice un interruptor para cambiar el tema claro/oscuro cuando estaba en el grado medio, no hubo tantos problemas esta vez. 

**Turno de la IA:** La IA tambien lo ha hecho, mucho más rapido que yo eso esta garantizado, ademas que lo ha hecho con un diseño que quede bien mientras que yo lo hice de la forma más simple.

### Conclusión

La IA es mucho más rapida que los humanos, en ese apartado salimos perdiendo. Pero nosotros si aprendemos podemos hacer una página mucho mejor que la IA, ya que ellos a veces suelen hacer un poco simple como el caso de Chat GPT que no es tan revolucionario como hace el codigo, pero hay IAs que estan hechas solamente para programación como el caso de Claude y Cursor que es con Cursor quien hice la comparación.