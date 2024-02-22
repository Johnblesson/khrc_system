import XLSX from 'xlsx';
import CSS from '../models/css.js';

export const exportStorageToExcel = async (req, res) => {
  try {
    // Fetch all storage data
    const allStorage = await CSS.find();

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allStorage);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Storage Data');

    // Write the workbook to a buffer
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Set the response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=storage_data.xlsx');

    // Send the Excel file as a response
    res.send(buffer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


