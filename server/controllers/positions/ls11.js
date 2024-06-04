import ls11Position from '../../models/position/ls11.js';

// Function to update the current row and column values in the database
// export const updatePosition = async (row, column) => {
//     try {
//       await ls11Position.findOneAndUpdate({}, { currentRow: row, currentColumn: column }, { upsert: true });
//     } catch (error) {
//       console.error('Error updating position:', error);
//     }
//   };
  
//   // Function to retrieve the current row and column values from the database
//   export const getCurrentPosition = async () => {
//     try {
//       const position = await ls11Position.findOne({});
//       if (position) {
//         return { currentRow: position.currentRow, currentColumn: position.currentColumn };
//       } else {
//         return { currentRow: 'A', currentColumn: 1 };
//       }
//     } catch (error) {
//       console.error('Error getting current position:', error);
//       return { currentRow: 'A', currentColumn: 1 };
//     }
//   };

// Function to update the current row and column values in the database
export const updatePosition = async (row, column) => {
  try {
      await ls11Position.findOneAndUpdate({}, { currentRow: row, currentColumn: column }, { upsert: true });
  } catch (error) {
      console.error('Error updating position:', error);
  }
};

// Function to retrieve the current row and column values from the database
export const getCurrentPosition = async () => {
  try {
      const position = await ls11Position.findOne({});
      if (position) {
          return { currentRow: position.currentRow, currentColumn: position.currentColumn };
      } else {
          return { currentRow: 'A', currentColumn: 1 };
      }
  } catch (error) {
      console.error('Error getting current position:', error);
      return { currentRow: 'A', currentColumn: 1 };
  }
};