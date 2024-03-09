const db = require("../dbconnection");

var Borrowing = {
  checkBorrowSame: function (data, callback) {
    return db.query(
      `SELECT COUNT(id) as id FROM reports WHERE equipment_id = ? AND status = 0 AND active = 1`,
      [data.equipment_id],
      callback
    );
  },
  insertDataBorrow: function (data, callback) {
    return db.query(
      `INSERT INTO reports(member_id, equipment_id, status, admin_approve_borrow, borrow_date, create_at, update_at, active) 
      VALUES (?, ?, '0', ?, ?, ?, ?, 1)`,
      [
        data.member_id,
        data.equipment_id,
        data.admin_approve_borrow,
        data.borrow_date,
        data.borrow_date,
        data.borrow_date,
      ],
      callback
    );
  },
};
module.exports = Borrowing;
