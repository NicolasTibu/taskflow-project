# Herramientas de desarrollo backend y APIs

Resumen de herramientas frecuentes en el ecosistema backend y por qué se utilizan.

---

## Axios

**Qué es:** Cliente HTTP para JavaScript (navegador y Node.js). Librería de terceros que abstrae las peticiones HTTP.

**Por qué se usa:**
- **JSON automático:** Parsea respuestas JSON sin llamar manualmente a `.json()`.
- **Errores HTTP:** Rechaza la promesa con códigos 4xx/5xx, a diferencia de `fetch`, que solo rechaza por fallos de red y obliga a comprobar `response.ok`.
- **Interceptores:** Permite añadir tokens, logging o reintentos de forma centralizada.
- **Timeout y cancelación:** Soporta `AbortController` y timeouts de forma sencilla.

**Cuándo usarlo:** Proyectos con múltiples endpoints, autenticación, interceptores o lógica compleja. Si el proyecto es pequeño y prioriza tamaño de bundle, `fetch` nativo puede ser suficiente.

---

## Postman

**Qué es:** Plataforma para diseñar, probar, documentar y distribuir APIs. Cliente HTTP con interfaz gráfica.

**Por qué se usa:**
- **Pruebas manuales:** Enviar peticiones GET, POST, etc. sin escribir código.
- **Colecciones:** Guardar conjuntos de peticiones y compartirlos con el equipo.
- **Entornos:** Cambiar base URL (local, staging, prod) con variables.
- **Tests automatizados:** Scripts de aserciones para validar respuestas.
- **Documentación:** Generar documentación a partir de colecciones.

**Cuándo usarlo:** Desarrollo de APIs, debugging, integración con frontend, documentación de endpoints.

---

## Sentry

**Qué es:** Plataforma de monitoreo de errores y rendimiento para aplicaciones.

**Por qué se usa:**
- **Detección de errores:** Captura excepciones no controladas y errores de frontend/backend.
- **Contexto:** Stack traces, breadcrumbs y datos de usuario para diagnosticar problemas.
- **Rendimiento:** Medición de transacciones, consultas lentas y cuellos de botella.
- **Alertas:** Notificaciones cuando ocurren errores o degradación de rendimiento.

**Cuándo usarlo:** Producción para detectar fallos en tiempo real, priorizar correcciones y entender el impacto en usuarios.

---

## Swagger (OpenAPI)

**Qué es:** Estándar (OpenAPI) y herramientas para describir, documentar y consumir APIs REST de forma estructurada.

**Por qué se usa:**
- **Especificación:** Define endpoints, parámetros, códigos de respuesta y esquemas en YAML/JSON.
- **Documentación interactiva:** Genera una UI (Swagger UI) donde se pueden probar las APIs desde el navegador.
- **Generación de código:** Clientes y stubs de servidor a partir de la especificación.
- **Contratos:** Sirve como contrato entre frontend y backend.

**Cuándo usarlo:** APIs públicas o compartidas entre equipos, documentación formal, validación de contratos y generación de código.
