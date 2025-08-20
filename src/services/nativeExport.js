// Native iOS app integration service

export const exportToNative = async (category, data) => {
  try {
    switch (category) {
      case 'evento':
        return await exportEvent(data);
      case 'tarea':
        return await exportTask(data);
      case 'idea':
        return await exportIdea(data);
      case 'gasto':
        return await exportExpense(data);
      case 'alarma':
        return await exportAlarm(data);
      default:
        throw new Error('Categoría no soportada');
    }
  } catch (error) {
    console.error('Error exporting to native:', error);
    // Fallback to manual sharing
    return await fallbackShare(category, data);
  }
};

// Generate .ics file for Calendar app
const exportEvent = async (data) => {
  const startDate = new Date(`${data.date}T${data.time}`);
  const endDate = new Date(startDate.getTime() + (data.duration || 60) * 60000);
  
  const icsContent = generateICS({
    title: data.title,
    start: startDate,
    end: endDate,
    description: data.notes || '',
  });

  return await shareContent(icsContent, 'event.ics', 'text/calendar');
};

// Generate reminder format for Reminders app
const exportTask = async (data) => {
  const reminderText = formatReminder({
    title: data.title,
    dueDate: data.dueDate,
    priority: data.priority,
    notes: data.notes,
  });

  return await shareContent(reminderText, 'reminder.txt', 'text/plain');
};

// Generate note format for Notes app
const exportIdea = async (data) => {
  const noteContent = formatNote({
    title: data.title,
    category: data.category,
    content: data.content,
    timestamp: new Date().toLocaleDateString('es-MX'),
  });

  return await shareContent(noteContent, 'idea.txt', 'text/plain');
};

// Generate expense note for Notes app
const exportExpense = async (data) => {
  const expenseNote = formatExpense({
    amount: data.amount,
    currency: data.currency,
    category: data.expenseCategory,
    description: data.description,
    date: new Date().toLocaleDateString('es-MX'),
  });

  return await shareContent(expenseNote, 'gasto.txt', 'text/plain');
};

// Generate alarm/reminder
const exportAlarm = async (data) => {
  const alarmReminder = formatAlarm({
    label: data.label,
    date: data.date,
    time: data.time,
    repeat: data.repeat,
  });

  return await shareContent(alarmReminder, 'alarma.txt', 'text/plain');
};

// Share content using Web Share API
const shareContent = async (content, filename, mimeType) => {
  if (navigator.share) {
    // Native sharing (preferred on iOS)
    return await navigator.share({
      title: 'Agenda Personal',
      text: content,
    });
  } else if (navigator.canShare && navigator.canShare({ files: [] })) {
    // File sharing
    const file = new File([content], filename, { type: mimeType });
    return await navigator.share({
      files: [file],
    });
  } else {
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(content);
    alert('Copiado al portapapeles. Pégalo en la app correspondiente.');
    return true;
  }
};

// Fallback sharing when native methods fail
const fallbackShare = async (category, data) => {
  const appUrls = {
    evento: 'calshow://',
    tarea: 'x-apple-reminderkit://',
    idea: 'mobilenotes://',
    gasto: 'mobilenotes://',
    alarma: 'clock-alarm://',
  };

  const url = appUrls[category];
  if (url) {
    // Try to open the native app
    window.location.href = url;
    return true;
  }

  return false;
};

// Format generators
const generateICS = ({ title, start, end, description }) => {
  const formatDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Agenda Personal//ES
BEGIN:VEVENT
UID:${Date.now()}@agenda-personal
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;
};

const formatReminder = ({ title, dueDate, priority, notes }) => {
  let reminder = `📋 ${title}\n\n`;
  
  if (dueDate) {
    reminder += `📅 Fecha límite: ${new Date(dueDate).toLocaleDateString('es-MX')}\n`;
  }
  
  if (priority && priority !== 'normal') {
    const priorityText = priority === 'high' ? 'Alta' : 'Baja';
    reminder += `⚡ Prioridad: ${priorityText}\n`;
  }
  
  if (notes) {
    reminder += `\n📝 Notas:\n${notes}`;
  }
  
  return reminder;
};

const formatNote = ({ title, category, content, timestamp }) => {
  return `💡 ${title}

📂 Categoría: ${category}
📅 Fecha: ${timestamp}

${content || 'Sin contenido adicional'}

---
Creado con Agenda Personal`;
};

const formatExpense = ({ amount, currency, category, description, date }) => {
  return `💰 Gasto Registrado

💵 Monto: ${amount} ${currency}
📂 Categoría: ${category}
📝 Descripción: ${description}
📅 Fecha: ${date}

---
Registro de Finanzas`;
};

const formatAlarm = ({ label, date, time, repeat }) => {
  let alarm = `⏰ ${label}\n\n`;
  alarm += `📅 Fecha: ${new Date(date).toLocaleDateString('es-MX')}\n`;
  alarm += `🕐 Hora: ${time}\n`;
  
  if (repeat && repeat !== 'none') {
    const repeatText = {
      daily: 'Todos los días',
      weekly: 'Cada semana',
      monthly: 'Cada mes'
    };
    alarm += `🔄 Repetir: ${repeatText[repeat]}\n`;
  }
  
  return alarm;
};