function aplicarMMIFC(contexto, d) {
  if (
    d.identificaVariableIndependiente &&
    d.identificaVariableDependiente &&
    d.estableceRelacion &&
    d.contienePrediccion &&
    d.esComprobable &&
    d.coherenteConPregunta
  ) {
    return {
      nivel: 'A0',
      estado: 'AVANZA',
      procesoObjetivo: 'FORMULACION_HIPOTESIS',
      mensaje:
        'Tu hipótesis ya relaciona lo que cambiarás con lo que observarás. ' +
        'Ahora piensa: ¿cómo podrías comprobarla?',
      requiereReintento: false
    };
  }


  switch (d.dificultadPrincipal) {
    case 'VARIABLE_INDEPENDIENTE':
      return {
        nivel: 'A1',
        estado: 'REINTENTO',
        procesoObjetivo: 'IDENTIFICAR_VARIABLE',
        mensaje:
          'Observa nuevamente la situación. ' +
          '¿Qué condición vas a cambiar durante la investigación?',
        requiereReintento: true
      };


    case 'VARIABLE_DEPENDIENTE':
      return {
        nivel: 'A1',
        estado: 'REINTENTO',
        procesoObjetivo: 'IDENTIFICAR_RESULTADO',
        mensaje:
          'Ya pensaste en algo que puede cambiar. ' +
          '¿Qué característica de la planta observarás o medirás para saber qué ocurrió?',
        requiereReintento: true
      };


    case 'RELACION':
      return {
        nivel: 'A1',
        estado: 'REINTENTO',
        procesoObjetivo: 'RELACIONAR',
        mensaje:
          'Ya mencionaste elementos importantes. ' +
          '¿Cómo crees que el cambio de uno podría afectar al otro?',
        requiereReintento: true
      };


    case 'PREDICCION':
      return {
        nivel: 'A1',
        estado: 'REINTENTO',
        procesoObjetivo: 'PREDECIR',
        mensaje:
          'Imagina que realizamos el experimento. ' +
          '¿Qué esperas que ocurra con el crecimiento de la planta?',
        requiereReintento: true
      };


    case 'COMPROBABILIDAD':
      return {
        nivel: 'A2',
        estado: 'REINTENTO',
        procesoObjetivo: 'COMPROBABILIDAD',
        mensaje:
          'Piensa en algo que realmente puedas observar o medir. ' +
          '¿Qué dato podría ayudarte a comprobar tu idea?',
        requiereReintento: true
      };


    case 'COHERENCIA':
      return {
        nivel: 'A2',
        estado: 'REINTENTO',
        procesoObjetivo: 'COHERENCIA',
        mensaje:
          'Vuelve a leer la pregunta de investigación. ' +
          '¿Tu hipótesis responde exactamente a lo que queremos investigar?',
        requiereReintento: true
      };


    default:
      return {
        nivel: 'A1',
        estado: 'REINTENTO',
        procesoObjetivo: 'COMPRENDER',
        mensaje: 'Cuéntame un poco más. ¿Qué crees que ocurrirá y por qué?',
        requiereReintento: true
      };
  }
}
