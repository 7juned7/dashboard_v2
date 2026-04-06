export const exportToCSV = (data) => {
  if (!data.length) return;

  const headers = ["Date", "Category", "Amount", "Type"];

  const rows = data.map((t) => [
    t.date,
    t.category,
    t.amount,
    t.type,
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "transactions.csv");

  document.body.appendChild(link);
  link.click();
};