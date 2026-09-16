# Mi Luquita — Beta Frontend

Prototipo beta mobile-first de **Mi Luquita**, marketplace peruano de tareas y cachuelos. Está construido con Next.js App Router + TypeScript + Tailwind CSS + Zustand y funciona únicamente con datos mockeados; no procesa pagos, no autentica usuarios y no envía mensajes reales.

## Estado de la guía visual

La especificación funcional recibida hace referencia a una **guía de estilos oficial**, pero esa guía no estaba presente entre los archivos cargados al construir este proyecto. Por eso `src/app/globals.css` y `tailwind.config.ts` contienen tokens **provisionales y claramente marcados**. No deben considerarse branding oficial.

Cuando se entregue la guía, reemplazar en conjunto:

- bloque `@theme` y variables `:root` de `src/app/globals.css`;
- valores espejo de `tailwind.config.ts`;
- cualquier decisión visual provisional de `src/components/ui`.

La lógica funcional, mocks y arquitectura no dependen de esos valores.

## Stack

- Next.js `16.3.4` (App Router)
- React `19.2.8`
- TypeScript `^5.9.3`
- Tailwind CSS `4.3.0`
- Zustand `5.0.15`
- Node.js 20.9+ recomendado

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Para validar producción:

```bash
npm run build
npm run start
```

Para lint:

```bash
npm run lint
```

> En el entorno donde se generó este artefacto no fue posible descargar paquetes desde npm, así que `next build` no pudo ejecutarse allí. Sí se realizó validación sintáctica de todos los `.ts/.tsx` y type-check semántico del dominio/store mediante el compilador TypeScript disponible.

## Arquitectura

La capa de UI nunca importa mocks directamente.

```text
Page / Screen
   ↓
Zustand app facade
   ↓
Domain services (reglas de negocio)
   ↓
Mock repository (src/services/mock-database.ts)
   ↓
Typed mocks (src/mocks)
```

La intención es que `mock-database.ts` pueda sustituirse más adelante por un cliente REST sin reescribir las pantallas.

La dirección se trata mediante DTOs públicos/revelados en `task-service.ts`: un componente de Ejecutor no recibe la dirección exacta hasta que el usuario sea el ejecutor seleccionado y exista un pago asegurado/capturado.

## Rutas principales

### Acceso / global

- `/` — acceso demo
- `/perfil` — perfil según rol activo
- `/notificaciones` — centro in-app
- `/demo` — panel de estados y tiempo simulado

### Solicitante

- `/solicitante`
- `/solicitante/tareas`
- `/solicitante/tareas/nueva`
- `/solicitante/tareas/nueva/ubicacion`
- `/solicitante/tareas/nueva/resumen`
- `/solicitante/tareas/[taskId]`
- `/solicitante/tareas/[taskId]/editar`
- `/solicitante/tareas/[taskId]/postulantes`
- `/solicitante/tareas/[taskId]/acuerdo`
- `/solicitante/tareas/[taskId]/pago`
- `/solicitante/tareas/[taskId]/chat`
- `/solicitante/tareas/[taskId]/ampliacion`
- `/solicitante/tareas/[taskId]/finalizacion`
- `/solicitante/tareas/[taskId]/problema`
- `/solicitante/tareas/[taskId]/disputa`
- `/solicitante/tareas/[taskId]/calificar`

### Ejecutor

- `/ejecutor`
- `/ejecutor/cachuelos`
- `/ejecutor/cachuelos/[taskId]`
- `/ejecutor/postulaciones`
- `/ejecutor/tareas`
- `/ejecutor/tareas/[taskId]`
- `/ejecutor/tareas/[taskId]/acuerdo`
- `/ejecutor/tareas/[taskId]/chat`
- `/ejecutor/tareas/[taskId]/ampliacion`
- `/ejecutor/tareas/[taskId]/finalizacion`
- `/ejecutor/tareas/[taskId]/disputa`
- `/ejecutor/tareas/[taskId]/calificar`

## Escenarios demo preparados

### Solicitante

| ID | Escenario |
|---|---|
| `t-demo-applicants` | tarea con 4 postulantes para comparar y seleccionar; incluye a Diego, usuario nuevo sin reputación |
| `t-demo-pay` | acuerdo creado y pago pendiente |
| `t-demo-upcoming` | trabajo próximo con pago asegurado |
| `t-demo-active` | trabajo en curso con ampliación propuesta |
| `t-demo-finish` | ejecutor indicó que terminó; permite confirmar, disputar o simular cierre automático |
| `t-demo-done` | completada y lista para demostrar calificación bilateral |
| `t-demo-dispute` | disputa ya registrada |
| `t-demo-cancel` | cancelada antes de contratar |

### Ejecutor

| ID | Escenario |
|---|---|
| `t-exec-selected` | seleccionado; acuerdo pendiente de aceptación del Ejecutor |
| `t-exec-upcoming` | próximo; pago asegurado, dirección y chat desbloqueados |
| `t-exec-active` | en curso; tiene una ampliación propuesta y otra aceptada/pagada |
| `t-exec-done` | completado y listo para calificar al Solicitante |

### Pago rechazado

1. Entrar a `/demo`.
2. Activar **“Forzar que el siguiente pago sea rechazado”**.
3. Volver a `t-demo-pay` o seleccionar un ejecutor en `t-demo-applicants`.
4. Ir a pago y presionar **Asegurar pago**.
5. Se verá `Procesando → Pago rechazado`.
6. Reintentar; el flag se consume en el primer intento y el siguiente puede quedar asegurado.

### Ampliación aceptada / rechazada

En perfil Ejecutor abrir `t-exec-active` → **Revisar ampliaciones**. La ampliación propuesta se puede aceptar o rechazar. Otra extensión ya viene con estado **Pago asegurado** para mostrar el estado final del flujo.

### Finalización automática

Abrir `/demo` → **Simular finalización automática**. Se aplica a `t-demo-finish` sin esperar tiempo real.

### Calificación una hora después

Abrir `/demo` → activar **“Simular que ya pasó 1 hora”**. Las calificaciones se guardan ocultas hasta que exista la de la otra parte. Los seeds `t-demo-done` y `t-exec-done` ya contienen una calificación contraria oculta para demostrar el reveal bilateral.

## Datos mock

- 12 usuarios con reputaciones variadas y uno nuevo sin reputación.
- 10 categorías.
- 32 tareas entre marketplace y escenarios de demostración.
- Postulaciones seleccionadas, pendientes y no seleccionadas.
- Pagos asegurados, capturados y uno configurable como rechazado.
- Chats precargados.
- Notificaciones in-app.
- Disputa precargada.
- Ratings buenos, medios y uno negativo.

## Reglas implementadas

- Un único ejecutor seleccionado por tarea.
- Sin contraofertas.
- Selección manual.
- Dirección exacta privada antes de pago asegurado.
- Chat bloqueado antes de pago asegurado.
- Pago inicial y pago adicional simulados.
- Comisión 3.5% al Solicitante y 3.5% al Ejecutor, centralizada en `payment-service.ts`.
- Reputaciones separadas por perfil.
- Ampliaciones solo agregan tiempo/alcance/monto; nunca reducen el acuerdo original.
- Máquina de estados tipada y transiciones centrales en `task-service.ts`.
- Cierre manual, cierre automático simulado y disputa.
- Rating diferido y reveal bilateral.

## Servicios externos explícitamente no integrados

Mercado Pago, Mapbox, FCM, Resend, Twilio Verify, Didit KYC, Cloudflare R2, PostHog y Sentry. Los puntos visuales correspondientes son mocks. `MapView` queda aislado para reemplazarlo posteriormente por Mapbox.

## Nota sobre persistencia

El estado vive en memoria. Refrescar la página reconstruye los seeds iniciales. El botón **Restaurar todos los datos mock** en `/demo` hace lo mismo sin recargar.

## Correcciones 0.1.1

Esta revisión corrige los errores observados al ejecutar la beta con React 19 / Zustand 5 / Next.js 16:

- Se eliminaron selectores de Zustand que devolvían arrays nuevos mediante `filter()` o `sort()` en cada lectura del snapshot. Los componentes ahora seleccionan las colecciones estables del store y calculan derivados con `useMemo`, evitando `getServerSnapshot should be cached` y `Maximum update depth exceeded`.
- Se reemplazó `Intl.DateTimeFormat` en contenido hidratado por formateadores deterministas para hora de Perú (`src/shared/utils/date.ts`). Esto evita diferencias de ICU/locale entre Node y el navegador que producían errores de hidratación.
- Se reforzó el responsive para teléfonos angostos: top bar en dos filas bajo 480 px, navegación inferior con etiquetas truncables, filtros y campos que pasan a una columna, inputs con `min-width: 0`, tarjetas con encabezados adaptativos y protección contra overflow de textos largos.
- El logo del top bar ahora conserva el perfil activo al volver al inicio.

Para validar localmente después de instalar dependencias:

```bash
npm run typecheck
npm run lint
npm run build
```
