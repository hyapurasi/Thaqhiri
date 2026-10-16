# Thaqhiri 0.1.0 — primera versión documentada de aplicación web con IA

**Naturaleza:** prototipo histórico archivado; **no constituye una versión operativa verificada ni producto final**.

**Fecha del documento fuente:** 15 de agosto de 2026.  
**Fecha de incorporación a GitHub:** 15 de octubre de 2026.  
**Fuente primaria:** Google Docs, *Thaqhiri — Bitácora técnica y código fuente*, secciones 3–9: https://docs.google.com/document/d/1Kjqj3hihDFhbuU9809-EA08F8UpU3xJqvNIOKJ3pbL4/edit

## Relación con el proyecto histórico

El repositorio **Thaqhiri fue creado el 21 de mayo de 2018** y conserva un commit público de esa fecha: https://github.com/hyapurasi/Thaqhiri/commit/e45aa087055d97ded7270aee19ad203bc216bb54.

**No confundir fechas:** los cuatro archivos de código que contiene esta carpeta proceden de la bitácora técnica redactada en agosto de 2026. Su incorporación actual no implica que este código ni el MMIFC existieran en 2018. Tampoco se ha demostrado que sea la primera implementación informática absoluta del proyecto; es la primera versión **0.1.0 documentada en la bitácora recuperada**.

## Propósito pedagógico

Prototipo de acompañamiento a la **formulación de hipótesis** a partir de la pregunta: «¿Cómo influye la cantidad de agua en el crecimiento de una planta?». La configuración inicial contempla quinto grado y la interfaz permite elegir tercero a sexto.

La actividad procura valorar si la respuesta infantil identifica el factor que cambia, el resultado observable, una relación y predicción, la posibilidad de comprobación y la coherencia con la pregunta. La IA no debe proporcionar la hipótesis correcta ni sustituir la actividad del estudiante.

## Arquitectura 0.1.0

1. **Index.html:** formulario y respuesta visible del estudiante.
2. **Code.gs:** aplicación Google Apps Script; validación y orquestación.
3. **GeminiService.gs:** llamada a Gemini para producir un diagnóstico estructurado.
4. **MMIFC.gs:** reglas pedagógicas para seleccionar la ayuda mínima necesaria.

Flujo: estudiante → interfaz → orquestador → Gemini (diagnóstico) → MMIFC (mediación) → interfaz.

El código contiene **A0–A4 y AT** como niveles conceptuales de mediación/transferencia, pero esta versión no demuestra una implementación completa de todos ellos ni de todo el ciclo de indagación.

## Archivos recuperados

- [Code.gs](Code.gs)
- [GeminiService.gs](GeminiService.gs)
- [MMIFC.gs](MMIFC.gs)
- [Index.html](Index.html)

Se preservó el código textual existente en la sección 7 de la bitácora, **sin modernizaciones ni cambios funcionales**. No contiene una clave API incorporada en el código: la recupera de las propiedades privadas de Apps Script.

## Dependencias y puesta en funcionamiento (no probada)

- Proyecto de Google Apps Script con los archivos anteriores.
- Propiedad privada `GEMINI_API_KEY`.
- Propiedad opcional `GEMINI_MODEL`; el código incluye un nombre de modelo predeterminado cuya disponibilidad debe verificarse antes de ejecutar.
- Autorización de acceso y despliegue de la aplicación web mediante el procedimiento oficial de Apps Script.

**No se ha ejecutado el prototipo, desplegado una URL ni verificado el comportamiento actual de Gemini.** La presencia de archivos en GitHub acredita documentación y código histórico, no validación técnica ni evidencia de impacto pedagógico.

## Limitaciones documentales y siguientes pasos

- Revisar ejecución, tratamiento de errores y vigencia del endpoint/modelo.
- Probar la adecuación del diagnóstico a lenguaje infantil y distintas respuestas.
- Comprobar tratamiento de datos; **no cargar datos personales de menores en pruebas sin protocolo de privacidad**.
- Distinguir esta v0.1.0 de la refactorización **v0.2.0** documentada posteriormente en la misma bitácora.
- Mantener un registro de ensayos reproducibles y nuevas versiones sin modificar el contenido de este archivo histórico.

**Autor declarado en la documentación del proyecto:** Hernan Yapurasi. Las fechas y afirmaciones de desarrollo deberán documentarse mediante sus fuentes respectivas.

**Estado:** ARCHIVO HISTÓRICO / CÓDIGO NO VALIDADO.
