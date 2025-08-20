import React, { useState } from 'react';
import { saveToStorage } from '../services/storage';
import { exportToNative } from '../services/nativeExport';

function QuickForm({ category, onBack, onSuccess }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to localStorage as backup
      const dataToSave = {
        ...formData,
        category: category.id,
        timestamp: new Date().toISOString()
      };
      
      saveToStorage(category.id, dataToSave);
      
      // Export to native app
      await exportToNative(category.id, dataToSave);
      
      onSuccess();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error al guardar. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    switch (category.id) {
      case 'evento':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Título del evento</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Reunión con equipo"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.time || ''}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Duración (minutos)</label>
              <input
                type="number"
                className="form-input"
                placeholder="60"
                value={formData.duration || ''}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Notas adicionales</label>
              <textarea
                className="form-textarea"
                placeholder="Detalles del evento..."
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
          </>
        );

      case 'tarea':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Título de la tarea</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Comprar víveres"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Fecha límite</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dueDate || ''}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Prioridad</label>
                <select
                  className="form-select"
                  value={formData.priority || 'normal'}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                >
                  <option value="low">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notas</label>
              <textarea
                className="form-textarea"
                placeholder="Detalles de la tarea..."
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
          </>
        );

      case 'idea':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Título de la idea</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: App para..."
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={formData.category || 'general'}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="general">General</option>
                <option value="trabajo">Trabajo</option>
                <option value="personal">Personal</option>
                <option value="negocio">Negocio</option>
                <option value="proyecto">Proyecto</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-textarea"
                placeholder="Describe tu idea..."
                value={formData.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows="4"
              />
            </div>
          </>
        );

      case 'gasto':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Monto</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="0.00"
                  value={formData.amount || ''}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Moneda</label>
                <select
                  className="form-select"
                  value={formData.currency || 'MXN'}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  <option value="MXN">MXN</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={formData.expenseCategory || 'otros'}
                onChange={(e) => handleInputChange('expenseCategory', e.target.value)}
              >
                <option value="comida">Comida</option>
                <option value="transporte">Transporte</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="salud">Salud</option>
                <option value="compras">Compras</option>
                <option value="servicios">Servicios</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Almuerzo en restaurante"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>
          </>
        );

      case 'alarma':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Etiqueta</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Tomar medicamento"
                value={formData.label || ''}
                onChange={(e) => handleInputChange('label', e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.time || ''}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Repetir</label>
              <select
                className="form-select"
                value={formData.repeat || 'none'}
                onChange={(e) => handleInputChange('repeat', e.target.value)}
              >
                <option value="none">No repetir</option>
                <option value="daily">Todos los días</option>
                <option value="weekly">Cada semana</option>
                <option value="monthly">Cada mes</option>
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="quick-form">
      <div className="form-header">
        <h2 className="form-title">
          <span>{category.icon}</span>
          {category.title}
        </h2>
        <button className="back-button" onClick={onBack}>
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : `Agregar ${category.title}`}
        </button>
      </form>
    </div>
  );
}

export default QuickForm;