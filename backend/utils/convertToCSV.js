export const convertToCSV = (dataArray) => {
  if (!dataArray || dataArray.length === 0) return '';

  const headers = Object.keys(dataArray[0]);
  const csvRows = dataArray.map(obj =>
    headers.map(field => {
      const val = obj[field];
      return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
    }).join(',')
  );

  return [headers.join(','), ...csvRows].join('\n');
};
