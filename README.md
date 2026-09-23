# ICN292-Lab3-Tapia-Joaquin

Laboratorio 3 de ICN-292 Sistemas de Información para la Gestión (USM, Campus Vitacura, 2026-2).
Triage de las solicitudes de devolución de Andes Hogar SpA, automatizado en n8n.

- Nombre: Joaquín Tapia Mandiola
- Semilla: S = 361, por lo que U = 41.000 y D = 14
- Fecha: 22-09-2026

## Archivos

| Archivo | Contenido |
|---|---|
| `ICN292-Lab3-Tapia-Joaquin.pdf` | Informe |
| `ICN292-Lab3-Tapia-Joaquin.tex` | Fuente del informe. Compila con pdflatex y necesita `Logo usmUSM.png` y la carpeta `evidencias/` |
| `ICN292-Lab3-Tapia-Joaquin-triage.json` | Flujo principal: Webhook, Switch en modo Rules, Edit Fields por ruta, consulta de la UF, registro, aviso al cliente y respuesta |
| `ICN292-Lab3-Tapia-Joaquin-emisor.json` | Envía las 15 solicitudes por POST al webhook del triage |
| `ICN292-Lab3-Tapia-Joaquin-resumen.json` | Resumen diario (Schedule Trigger + Summarize) y Error Workflow |
| `ICN292-Lab3-Tapia-Joaquin-bonus-code.json` | Bonus: las mismas reglas en un único nodo Code |
| `ICN292-Lab3-Tapia-Joaquin-bonus-code.js` | El código de ese nodo, para leerlo sin importar el flujo |
| `evidencias/` | Capturas de las ejecuciones con el panel de nodo, entrada y salida |

## Cómo reproducir

1. En n8n (probado en la versión 2.38.7), importar cada JSON desde el menú del workflow, opción *Import from File*.
2. Crear la Data Table `ICN292_Lab3_Tapia_Joaquin_registro` con estas columnas:
   `id_solicitud`, `sku`, `estado_producto`, `email_cliente`, `ruta`, `motivo`, `fecha` y `ejecucion` de tipo texto;
   `monto`, `dias_desde_compra`, `U`, `D`, `uf` y `monto_uf` de tipo número.
3. Crear una credencial SMTP y asignarla a los nodos *Notificar al cliente*, *Enviar resumen* y *Avisar error*.
   En las pruebas se usó un servidor SMTP local de prueba en `127.0.0.1:2525`, para que los correos de ejemplo no salieran a internet.
4. Publicar `resumen` (su rama Error Trigger es el Error Workflow) y `triage`. En *Settings* del triage, elegir `resumen` como Error Workflow.
5. Ejecutar `emisor` con *Execute workflow*. Cada solicitud queda en la Data Table y en la lista de ejecuciones del triage.
6. Para el bonus, publicar `bonus code` y enviar las solicitudes por POST a `/webhook/Devoluciones-AndesHogarSpA-code`.

El triage consulta `https://mindicador.cl/api` y usa el campo `uf.valor`. Los JSON no incluyen contraseñas ni tokens, y `pinData` está vacío en los cuatro.
