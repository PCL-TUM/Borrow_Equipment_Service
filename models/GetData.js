const db = require("../dbconnection");

var GetData = {
  getDataMember: function (rfid, callback) {
    return db.query(
      `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, 
    create_at, update_by, update_at, active FROM member WHERE rfid = ? AND active = 1`,
      [rfid],
      callback
    );
  },

  getDataMemberAll: function (callback) {
    return db.query(
      `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, create_at, update_by, update_at,
       active FROM member WHERE active = 1 ORDER BY update_at DESC`,
      callback
    );
  },

  getDataEquip: function (rfid, callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment WHERE rfid = ? AND active = 1`,
      [rfid],
      callback
    );
  },

  getDataEquipAll: function (callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment WHERE active = 1 ORDER BY update_at DESC`,
      callback
    );
  },

  getDataEquipRemainAll: function (callback) {
    return db.query(
      `SELECT DISTINCT equipment.equipment_name, equipment.brand, equipment.model , COUNT(DISTINCT equipment.id) as total
      FROM equipment
      LEFT JOIN reports ON equipment.id = reports.equipment_id
      WHERE (
      NOT EXISTS
      (
      SELECT * FROM reports
      WHERE equipment.id = reports.equipment_id AND reports.active = 1
      )
     OR reports.id IN (
       SELECT reports.id FROM reports 
       WHERE reports.id IN (SELECT MAX(reports.id) FROM reports
        WHERE reports.active = 1 GROUP BY reports.equipment_id ) 
        AND reports.status = 1 AND reports.active = 1
       )
      )
      AND equipment.active = 1
      GROUP BY equipment.equipment_name, equipment.brand, equipment.model`,
      callback
    );
  },

  // getDataEquipRemain: function (equipID, callback) {
  //   return db.query(
  //     `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by,
  //     create_at, update_by, update_at, active FROM equipment WHERE id = ? AND active = 1`,
  //     [equipID],
  //     callback
  //   );
  // },

  getDataBorrowing: function (callback) {
    return db.query(
      `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, c.brand, c.model, a.borrow_date 
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      WHERE a.status = 0 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.borrow_date DESC`,
      callback
    );
  },

  getDataReverting: function (callback) {
    return db.query(
      `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, c.brand, c.model, a.return_date 
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      WHERE a.status = 1 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.return_date DESC`,
      callback
    );
  },

  searchDataEquipRemain: function (search_value, callback) {
    return db.query(
      `SELECT DISTINCT equipment.equipment_name, equipment.brand, equipment.model , COUNT(DISTINCT equipment.id) as total
      FROM equipment
      LEFT JOIN reports ON equipment.id = reports.equipment_id
      WHERE (
      NOT EXISTS
      (
      SELECT * FROM reports
      WHERE equipment.id = reports.equipment_id AND reports.active = 1
      )
     OR reports.id IN (
       SELECT reports.id FROM reports 
       WHERE reports.id IN (SELECT MAX(reports.id) FROM reports
        WHERE reports.active = 1 GROUP BY reports.equipment_id ) 
        AND reports.status = 1 AND reports.active = 1
       )
      ) AND (equipment.equipment_name LIKE '%${search_value}%' OR equipment.brand LIKE '%${search_value}%' OR equipment.model LIKE '%${search_value}%')
      AND equipment.active = 1
      GROUP BY equipment.equipment_name, equipment.brand, equipment.model`,
      // [search_value, search_value, search_value],
      callback
    );
  },

  SearchDataReport: function (data, callback) {
    let typeSearch = data.typeSearch;
    return db.query(
      ///////////////////////////////////////////////////////////ทั้งหมด////////////////////////////////////////////////////////////////////////////////////
      typeSearch == 0
        ? `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number,  c.model, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 
      ORDER BY a.update_at DESC`
        : ////////////////////////////////////////////////////ทั้งหมด Search////////////////////////////////////////////////////////////////////////////////////
        typeSearch == 1
        ? `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number,  c.model, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND (borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?)
			ORDER BY a.update_at DESC`
        : /////////////////////////////////////////////////////ยืม/////////////////////////////////////////////////////////////////////////////////////////
        typeSearch == 2
        ? `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number,  c.model, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND  a.status = 0 AND (borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?)
			ORDER BY a.update_at DESC`
        : //////////////////////////////////////////////////////คืน///////////////////////////////////////////////////////////////////////////////////////////
          `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number,  c.model, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND  a.status = 1 AND (borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?)
			ORDER BY a.update_at DESC`,
      [data.firstDate, data.untilDate, data.firstDate, data.untilDate],
      callback
    );
  },

  searchDataMember: function (search_value, callback) {
    return db.query(
      `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, create_at, update_by, update_at,
      active FROM member WHERE active = 1 AND (firstname LIKE '%${search_value}%' OR lastname LIKE '%${search_value}%' OR username LIKE '%${search_value}%' OR 
      telephone LIKE '%${search_value}%')
      ORDER BY update_at DESC`,
      // [search_value, search_value, search_value, search_value],
      callback
    );
  },

  searchDataEquip: function (search_value, callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment 
			WHERE active = 1 AND (equipment_name LIKE '%${search_value}%' OR equipment_number LIKE '%${search_value}%' OR brand LIKE '%${search_value}%') ORDER BY update_at DESC`,
      // [search_value, search_value, search_value],
      callback
    );
  },

  getDataNoti: function (callback) {
    return db.query(
      `SELECT a.id as noti_id, b.id as report_id, c.username, c.firstname, c.lastname, d.equipment_name, d.equipment_number, e.department_name, b.status, 
      a.update_at as noti_date, b.update_at as updateReport_date, b.borrow_date, b.return_date
            FROM notification as a 
            JOIN reports as b ON a.report_id = b.id
            JOIN member as c ON b.member_id = c.id
            JOIN equipment as d ON b.equipment_id = d.id
            LEFT JOIN department as e ON b.used_department_id = e.id
            WHERE a.read_noti = 0 AND b.status = 0  AND a.active = 1  AND b.active = 1 AND c.active = 1 AND d.active = 1
            ORDER BY a.update_at DESC`,
      callback
    );
  },
};
module.exports = GetData;
