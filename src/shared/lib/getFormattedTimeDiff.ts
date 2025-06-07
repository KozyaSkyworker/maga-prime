export const getFormattedTimeDiff = (
  startTime: string,
  endTime?: string | null,
) => {
  // Парсинг времени начала с заменой пробела на 'T' (ISO 8601)
  const startDate = new Date(startTime.replace(" ", "T"));

  const now = endTime ? new Date(endTime.replace(" ", "T")) : new Date();

  // @ts-expect-error dates
  const diffMs = now - startDate; // Разница в миллисекундах

  // Вычисление часов и минут
  const totalMinutes = Math.floor(diffMs / 60000); // 1 мин = 60000 мс
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Форматирование в hh:mm (часы без ограничений, минуты с ведущим нулём)
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
