// Simple CSV export utility for mock data
// Usage: exportToCsv('filename.csv', dataArray, optionalHeaders)
// - dataArray: array of objects
// - optionalHeaders: array of { key, title } objects to control order and headers
export function exportToCsv(filename, rows, headers) {
  if (!rows || rows.length === 0) {
    console.warn('No rows to export');
    return;
  }

  const headerKeys = headers?.map(h => h.key) || Object.keys(rows[0]);
  const headerTitles = headers?.map(h => h.title || h.key) || headerKeys;

  const escapeCell = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };

  const csv = [headerTitles.join(',')]
    .concat(
      rows.map(row => headerKeys.map(k => escapeCell(row[k])).join(','))
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
