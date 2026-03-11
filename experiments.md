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