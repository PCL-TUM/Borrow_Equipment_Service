const Borrowing = require("../models/Borrowing");

// exports.getDataEquipRemain = (equipID, total_data) => {
//   return new Promise((resolve, reject) => {
//     try {
//       GetData.getDataEquipRemain(equipID, total_data, (err, rows) => {
//         if (rows != null) {
//           resolve(rows);
//         } else {
//           resolve(null);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       resolve(null);
//     }
//   });
// };

// exports.getDataReverting = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       GetData.getDataReverting((err, rows) => {
//         if (rows != null) {
//           resolve(rows);
//         } else {
//           resolve(null);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       resolve(null);
//     }
//   });
// };

exports.checkBorrowSame = (data) => {
  return new Promise((resolve, reject) => {
    try {
      Borrowing.checkBorrowSame(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
};
