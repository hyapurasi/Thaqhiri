const THAQHIRI_CONFIG = {
  APP_NAME: 'Thaqhiri 0.1',
  VERSION: '0.1.0',
  MMIFC_VERSION: '0.1',
  ROUTE_VERSION: 'HIP-0.1'
};


function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('Thaqhiri 0.1');
}


/**
 * Recibe desde la interfaz una producción del estudiante.
 * Coordina validación, diagnóstico IA y decisión MMIFC.
 */
function analizarHipotesis(datos) {
  validarEntrada_(datos);


  const contexto = {
    estudianteId: datos.estudianteId || 'PILOTO',
    grado: Number(datos.grado || 5),
    pregunta: datos.pregunta,
    hipotesis: datos.hipotesis,
    intento: Number(datos.intento || 1)
  };


  const diagnosticoIA = analizarConGemini(contexto);
  const decisionMMIFC = aplicarMMIFC(contexto, diagnosticoIA);


  return {
    ok: true,
    version: THAQHIRI_CONFIG.VERSION,
    diagnostico: diagnosticoIA,
    mmifc: decisionMMIFC
  };
}


function validarEntrada_(datos) {
  if (!datos) {
    throw new Error('No se recibieron datos.');
  }


  if (!datos.pregunta) {
    throw new Error('Falta la pregunta de investigación.');
  }


  if (!datos.hipotesis) {
    throw new Error('El estudiante debe escribir una respuesta.');
  }
}
