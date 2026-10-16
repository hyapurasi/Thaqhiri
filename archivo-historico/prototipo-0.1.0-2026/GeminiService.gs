function analizarConGemini(contexto) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('GEMINI_API_KEY');
  const model = props.getProperty('GEMINI_MODEL') || 'gemini-3.5-flash';


  if (!apiKey) {
    throw new Error('No se encontró GEMINI_API_KEY en Script Properties.');
  }


  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    model +
    ':generateContent';


  const prompt = construirPromptDiagnostico_(contexto);


  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          identificaVariableIndependiente: { type: 'BOOLEAN' },
          identificaVariableDependiente: { type: 'BOOLEAN' },
          estableceRelacion: { type: 'BOOLEAN' },
          contienePrediccion: { type: 'BOOLEAN' },
          esComprobable: { type: 'BOOLEAN' },
          coherenteConPregunta: { type: 'BOOLEAN' },
          dificultadPrincipal: {
            type: 'STRING',
            enum: [
              'NINGUNA',
              'VARIABLE_INDEPENDIENTE',
              'VARIABLE_DEPENDIENTE',
              'RELACION',
              'PREDICCION',
              'COMPROBABILIDAD',
              'COHERENCIA',
              'RESPUESTA_INSUFICIENTE'
            ]
          },
          descripcion: { type: 'STRING' },
          evidenciaRespuesta: { type: 'STRING' },
          confianza: { type: 'NUMBER' }
        },
        required: [
          'identificaVariableIndependiente',
          'identificaVariableDependiente',
          'estableceRelacion',
          'contienePrediccion',
          'esComprobable',
          'coherenteConPregunta',
          'dificultadPrincipal',
          'descripcion',
          'evidenciaRespuesta',
          'confianza'
        ]
      }
    }
  };


  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-goog-api-key': apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });


  const code = response.getResponseCode();
  const texto = response.getContentText();


  if (code < 200 || code >= 300) {
    throw new Error('Error Gemini ' + code + ': ' + texto);
  }


  const data = JSON.parse(texto);


  if (!data.candidates || !data.candidates.length || !data.candidates[0].content) {
    throw new Error('Gemini no devolvió una respuesta utilizable.');
  }


  const respuestaTexto = data.candidates[0].content.parts
    .map(p => p.text || '')
    .join('');


  return JSON.parse(respuestaTexto);
}


function construirPromptDiagnostico_(c) {
  return `
Eres el componente diagnóstico de Thaqhiri,
un tutor inteligente para estudiantes de primaria.


NO debes responder directamente la pregunta científica.
Tu única función es analizar la producción del estudiante.


GRADO:
${c.grado}° de primaria


PREGUNTA DE INVESTIGACIÓN:
${c.pregunta}


RESPUESTA / HIPÓTESIS DEL ESTUDIANTE:
${c.hipotesis}


Analiza si la respuesta:
1. identifica el factor o variable que cambia;
2. identifica el resultado observable;
3. establece una relación entre ambos;
4. contiene una predicción;
5. puede comprobarse mediante evidencia;
6. es coherente con la pregunta.


IMPORTANTE:
- No exijas lenguaje científico adulto.
- Evalúa el significado, no solamente la forma gramatical.
- Una idea puede estar correctamente expresada con lenguaje infantil.
- No mejores ni reescribas la hipótesis.
- No proporciones la respuesta correcta.
- Identifica solamente la dificultad principal.
- La descripción debe ser breve y pedagógicamente útil.
- evidenciaRespuesta debe citar o resumir qué parte de la respuesta permitió realizar el diagnóstico.


Devuelve únicamente el objeto JSON definido.
`;
}
