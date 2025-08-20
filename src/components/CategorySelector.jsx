import React from 'react';

const categories = [
  {
    id: 'evento',
    icon: '📅',
    title: 'Evento',
    description: 'Agregar a Calendario',
  },
  {
    id: 'tarea',
    icon: '✅',
    title: 'Tarea',
    description: 'Agregar a Recordatorios',
  },
  {
    id: 'idea',
    icon: '💡',
    title: 'Idea',
    description: 'Guardar en Notas',
  },
  {
    id: 'gasto',
    icon: '💰',
    title: 'Gasto',
    description: 'Registrar finanzas',
  },
  {
    id: 'alarma',
    icon: '⏰',
    title: 'Alarma',
    description: 'Programar recordatorio',
  },
];

function CategorySelector({ onSelect }) {
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#007AFF' }}>
          1️⃣ Un solo toque desde tu pantalla
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#a0a0a0', lineHeight: '1.4' }}>
          Desde el icono en tu inicio, abre la interfaz nativa. Sin abrir apps, sin buscar menús.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#007AFF' }}>
          2️⃣ Elige y registra en segundos
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#a0a0a0', lineHeight: '1.4' }}>
          Selecciona si quieres guardar una tarea, idea o evento. Agrega los detalles importantes como fecha, hora o duración, etc.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#007AFF' }}>
          3️⃣ Visualiza todo al instante
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#a0a0a0', lineHeight: '1.4' }}>
          Con los widgets en tu pantalla, lo que anotes estará siempre visible en tiempo real. Sin abrir nada más.
        </p>
      </div>

      <div style={{ marginBottom: '16px', color: '#a0a0a0', fontSize: '0.9rem' }}>
        ¿Qué deseas agregar?
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-button"
            onClick={() => onSelect(category)}
          >
            <span className="icon">{category.icon}</span>
            <div className="content">
              <div className="title">{category.title}</div>
              <div className="description">{category.description}</div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default CategorySelector;