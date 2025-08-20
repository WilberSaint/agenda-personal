// LocalStorage service for backup and history
export const saveToStorage = (category, data) => {
  try {
    const key = `agenda_${category}`;
    const existing = getFromStorage(category);
    const updated = [data, ...existing.slice(0, 99)]; // Keep last 100 items
    localStorage.setItem(key, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
};

export const getFromStorage = (category) => {
  try {
    const key = `agenda_${category}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from storage:', error);
    return [];
  }
};

export const getAllFromStorage = () => {
  try {
    const categories = ['evento', 'tarea', 'idea', 'gasto', 'alarma'];
    const allData = {};
    
    categories.forEach(category => {
      allData[category] = getFromStorage(category);
    });
    
    return allData;
  } catch (error) {
    console.error('Error reading all from storage:', error);
    return {};
  }
};

export const clearStorage = (category = null) => {
  try {
    if (category) {
      localStorage.removeItem(`agenda_${category}`);
    } else {
      // Clear all agenda data
      const categories = ['evento', 'tarea', 'idea', 'gasto', 'alarma'];
      categories.forEach(cat => {
        localStorage.removeItem(`agenda_${cat}`);
      });
    }
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};