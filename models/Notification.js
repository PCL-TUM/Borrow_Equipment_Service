var db = require("../dbconnection");

var Notification = {
  getDataReport: function (callback) {
    return db.query(
      `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
        FROM reports as a 
        JOIN member as b ON a.member_id = b.id
        JOIN equipment as c ON a.equipment_id = c.id
        LEFT JOIN department as d ON a.used_department_id = d.id
        WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND a.status = 0
        ORDER BY a.update_at DESC`,
      callback
    );
  },

  checkDataNoti: function (reportID, callback) {
    return db.query(
      `SELECT * FROM notification WHERE report_id = ? AND active = 1`,
      [reportID],
      callback
    );
  },

  insertDataNoti: function (reportID, callback) {
    return db.query(
      `INSERT INTO notification(report_id, read_noti, create_at, update_at, active) VALUES (?, 0, DATE_ADD(now(), INTERVAL +7 HOUR), DATE_ADD(now(), INTERVAL +7 HOUR), 1)`,
      [reportID],
      callback
    );
  },

  updateDateSendNoti: function (NotiID, callback) {
    return db.query(
      `UPDATE notification SET update_at = DATE_ADD(now(), INTERVAL +7 HOUR), active= 1 WHERE id = ? AND active = 1`,
      [NotiID],
      callback
    );
  },

  setReadNoti: function (reportID, callback) {
    return db.query(
      `UPDATE notification SET read_noti = 1, update_at = DATE_ADD(now(), INTERVAL +7 HOUR), active= 1 WHERE report_id = ? AND active = 1`,
      [reportID],
      callback
    );
  },
};

module.exports = Notification;
