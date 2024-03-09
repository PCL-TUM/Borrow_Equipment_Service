const db = require("../dbconnection");

var Reverting = {
  UpdateDataRevert: function (data, callback) {
    return db.query(
      `UPDATE reports SET status = 1, used_department_id = Null, admin_approve_return = ? , return_date = ?, update_at = ?, active = 1 
      WHERE equipment_id = ? AND status = 0 AND active = 1`,
      [
        data.admin_approve_return,
        data.return_date,
        data.return_date,
        data.equipment_id,
      ],
      callback
    );
  },
};
module.exports = Reverting;
