# 📱 Agenda Personal PWA

Una agenda personal ultra-rápida diseñada como PWA para iPhone. Interfaz nativa que permite capturar información en segundos y exportarla directamente a las apps nativas de iOS.

## ✨ Características

- **🚀 Ultra-rápida**: Interfaz minimalista tipo launcher
- **📱 PWA Nativa**: Se instala como app en iPhone
- **🔄 Integración iOS**: Exporta a Calendar, Recordatorios, Notas
- **💾 Backup Local**: LocalStorage como respaldo
- **⚡ Offline**: Funciona sin conexión

## 🎯 Funcionalidades

### 📅 Eventos
- Agrega eventos al Calendario nativo
- Formato .ics compatible
- Fecha, hora, duración y notas

### ✅ Tareas
- Exporta a Recordatorios de iPhone
- Fechas límite y prioridades
- Formato estructurado

### 💡 Ideas
- Guarda en Notas con categorías
- Markdown friendly
- Organización automática

### 💰 Gastos
- Registro de finanzas personal
- Categorías predefinidas
- Exporta a Notas estructuradas

### ⏰ Alarmas
- Programación de recordatorios
- Repeticiones configurables
- Integración con Clock/Recordatorios

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Setup Local
```bash
# Clonar repositorio
git clone https://github.com/tuusuario/agenda-personal.git
cd agenda-personal

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

### Deploy a GitHub Pages
```bash
# Build del proyecto
npm run build

# Deploy automático
npm run deploy
```

## 📱 Instalación en iPhone

### Método 1: Desde Safari
1. Abre la URL en Safari
2. Toca el botón **Compartir** 
3. Selecciona **"Agregar a pantalla de inicio"**
4. Confirma la instalación

### Método 2: PWA Install Prompt
- La app mostrará automáticamente el prompt de instalación
- Sigue las instrucciones en pantalla

## 🔧 Configuración

### GitHub Pages
Actualiza el `homepage` en `package.json`:
```json
{
  "homepage": "https://tuusuario.github.io/agenda-personal"
}
```

### Service Worker
El SW se registra automáticamente para funcionamiento offline.

## 🎨 Personalización

### Iconos PWA
Reemplaza los iconos en `/public/icons/`:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

### Tema y Colores
Modifica las variables CSS en `src/App.css`:
```css
:root {
  --bg-primary: #000000;
  --accent: #007AFF;
  /* ... más variables */
}
```

## 📋 Uso

1. **Toca el ícono** en tu pantalla de inicio
2. **Selecciona categoría** (Evento, Tarea, Idea, etc.)
3. **Completa el formulario** rápido
4. **Confirma** - se abre la app nativa correspondiente

## 🔄 Flujo de Datos

```
PWA Form → LocalStorage (backup) → Export Native → iOS App
```

- **LocalStorage**: Respaldo local (últimos 100 items)
- **Web Share API**: Exportación a apps nativas
- **Fallback**: Clipboard si falla sharing

## 🛠️ Tecnologías

- **React 18**: Framework principal
- **PWA**: Manifest + Service Worker
- **Web Share API**: Integración iOS
- **CSS Variables**: Theming dinámico
- **LocalStorage**: Persistencia offline

## 📱 Compatibilidad

- **iOS Safari**: Totalmente compatible
- **Android Chrome**: Compatible básico
- **Desktop**: Funcional pero optimizado para móvil

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a branch (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

## 📄 Licencia

MIT License - ver `LICENSE` para detalles.

## 🆘 Soporte

¿Problemas con la instalación? 
- Verifica que estés usando Safari en iPhone
- Asegúrate de tener iOS 12+ 
- Revisa que GitHub Pages esté activo

---

**🎯 Objetivo**: Capturar información en < 30 segundos y delegarla a apps nativas iPhone.