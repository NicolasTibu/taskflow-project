# Ingenería de Prompts

## Introducción 
Aquí se documentarán las técnicas de prompting que han resultado más efectivas. El propósito es crear una biblioteca de patrones que optimicen la interacción con la IA y aseguren resultados consistentes.

## 10 Técnicas Utilizadas
* **1. Definición de Rol (Persona Prompting):**

**Prompt:** Actúa como un Desarrollador Senior de Backend especializado en Node.js y Seguridad. Revisa este endpoint y señala posibles vulnerabilidades de inyección SQL o falta de sanitización.  

**Por qué funciona:** Al establecer un rol, la IA prioriza patrones de diseño robustos y un tono crítico profesional, enfocándose en la seguridad antes que en la rapidez.

* **2. Razonamiento paso a paso (Chain of Thought):**

**Prompt:** Explica paso a paso cómo funciona el flujo de autenticación JWT en este archivo antes de sugerir cualquier cambio de código.

**Por qué funciona:** Fuerza a la IA a "pensar" y validar su lógica interna antes de escribir código, reduciendo errores conceptuales.

* **3. Aprendizaje con ejemplos (Few-shot Prompting):** 

**Prompt:** Crea un componente de botón siguiendo este estilo: [Ejemplo A: Primario]. Ahora, genera la variante para [Ejemplo B: Peligro] manteniendo la misma estructura de props.

**Por qué funciona:** Los ejemplos reducen la ambigüedad. La IA imita tu estilo de tipado, nombrado y estructura exacta.

* **4. Restricciones Negativas (Negative Constraints):** 

**Prompt:** Refactoriza esta función para usar async/await. No utilices librerías externas como Axios, usa exclusivamente la Fetch API nativa.

**Por qué funciona:** Evita que la IA añada dependencias innecesarias o soluciones que no encajan con tu stack tecnológico. 

* **5. Formato de Salida Estricto:** 

**Prompt:** Analiza este componente y devuelve únicamente un objeto JSON con las claves: 'bugs' (array), 'sugerencia_mejora' (string) y 'complejidad_ciclo' (número).

**Por qué funciona:** Ideal para cuando necesitas procesar la respuesta de la IA programáticamente o quieres una respuesta directa sin "charla" introductoria.

* **6. Debugging con Contexto de Error:** 

**Pormpt:** Tengo este error: [Error de Consola]. Aquí está el código relacionado. Analiza primero si el error es de sintaxis o de lógica de tipos antes de dar la solución.

**Por qué funciona:** Evita parches rápidos y obliga a la IA a realizar un diagnóstico técnico preciso. 

* **7. Documentación Proactiva:** 

**Prompt:** Genera JSDoc para esta función incluyendo: descripción, tipos de parámetros, valor de retorno y un ejemplo de uso común.

**Por qué funciona:** Define un estándar de documentación consistente en todo el proyecto.

* **8. Optimización de Rendimiento:**

**Prompt:** Actúa como un experto en rendimiento web. Revisa este bucle y propón una alternativa que reduzca la complejidad de $O(n^2)$ a $O(n)$ si es posible.

**Por qué funciona:** Enfoca la capacidad de la IA en la eficiencia algorítmica específica.

* **9. Generación de Tests Unitarios:**

**Prompt:** "Usa Jest para testear esta función. Crea 3 casos de prueba: un caso de éxito, uno con valores nulos y uno que gestione un timeout.

**Por qué funciona:** Asegura una cobertura de tests completa (Edge cases) que a menudo olvidamos pedir.

* **10. Transformación de Código (Migración):**

**Prompt:** Convierte este componente de clase de React a un Functional Component usando Hooks (useState y useEffect), manteniendo la misma lógica de negocio.

**Por qué funciona:** Es una tarea mecánica donde la IA brilla al mapear ciclos de vida antiguos a hooks modernos sin errores de transcripción.

## Repositorio de Prompts
> Estructura recomendada para guardar prompts exitosos.