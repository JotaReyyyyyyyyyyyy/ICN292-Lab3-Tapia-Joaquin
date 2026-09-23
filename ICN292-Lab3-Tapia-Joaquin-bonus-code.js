const U = 41000;
const D = 14;

return $input.all().map(item => {
  const s = item.json.body;
  const monto = Number(s.monto);
  const dias = Number(s.dias_desde_compra);
  let ruta = 'APROBACION';
  let motivo = 'Monto dentro de U, en plazo y sin causal de rechazo o revision';
  
  if (!s.id_solicitud) { ruta = 'DATOS INVALIDOS'; motivo = 'Falta id_solicitud'; }
  else if (Number.isNaN(monto) || Number.isNaN(dias)) { ruta = 'DATOS INVALIDOS'; motivo = 'Monto o dias no numericos'; }
  else if (monto <= 0) { ruta = 'DATOS INVALIDOS'; motivo = 'Monto no mayor que cero'; }
  else if (dias > D) { ruta = 'RECHAZO'; motivo = 'Fuera de plazo: mas de ' + D + ' dias'; }
  else if (s.estado_producto === 'danado_por_uso') { ruta = 'RECHAZO'; motivo = 'Producto danado por uso'; }
  else if (monto > U) { ruta = 'REVISION'; motivo = 'Monto mayor que U (' + U + ' CLP)'; }
  else if (s.estado_producto === 'con_fallas') { ruta = 'REVISION'; motivo = 'Producto con fallas'; }
  
  return { json: { id_solicitud: s.id_solicitud, sku: s.sku, monto, dias_desde_compra: dias, estado_producto: s.estado_producto, ruta, motivo, U, D } };
});
