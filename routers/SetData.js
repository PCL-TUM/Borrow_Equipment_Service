var express = require("express");
var router = express.Router();
var Notification = require("../models/Notification");
var SetData = require("../models/SetData");

//อัปเดตดูแจ้งเตือน
router.post("/setReadNoti", async function (req, res) {
  let reportID = req.body.reportID;
  let statusReadNoti = await setReadNoti(reportID);
  if (statusReadNoti != null) {
    res.json({ status: "Succeed", data: "Set read noti succeed" });
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//อัปเดตอุปกรณ์ว่าอยู่ที่แผนกไหน ในหน้าแผนก
router.post("/setDpmID", async function (req, res) {
  if (req.body.rfid != "") {
    //เช็คว่ามี Equipment ในระบบหรือไม่
    let dataEquip = await checkEquipForDpm(req.body);
    if (dataEquip.length > 0) {
      //เช็คว่ามี Equipment ที่ถูกยืมแล้วหรือไม่
      let statusCheckBor = await checkBorrowForDpm(dataEquip[0]["id"]);
      if (statusCheckBor[0]["id"] > 0) {
        let statusSetDpm = await setDpmID(req.body);
        if (statusSetDpm != null) {
          //ดึงข้อมูลแสดงตำแหน่ง หน้า DEpartment
          let dataEquipDepart = await getEquipDepart(req.body);
          if (dataEquipDepart != null) {
            res.json({ status: "Succeed", data: dataEquipDepart });
          } else {
            res.json({ status: "Failed", data: "Error" });
          }
        } else {
          res.json({ status: "Failed", data: "Error" });
        }
      } else {
        res.json({
          status: "Failed",
          data: "Equip is not borrowed or reverted",
        });
      }
    } else {
      res.json({ status: "Failed", data: "No Equip information" });
    }
  } else {
    let dataEquipDepart = await getEquipDepart(req.body);
    if (dataEquipDepart != null) {
      res.json({ status: "Succeed", data: dataEquipDepart });
    } else {
      res.json({ status: "Failed", data: "Error" });
    }
  }
});

async function setReadNoti(reportID) {
  return new Promise((resolve, reject) => {
    try {
      Notification.setReadNoti(reportID, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
}

async function checkEquipForDpm(data) {
  return new Promise((resolve, reject) => {
    try {
      SetData.checkEquipForDpm(data, (err, rows) => {
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
}

async function checkBorrowForDpm(equipment_id) {
  return new Promise((resolve, reject) => {
    try {
      SetData.checkBorrowForDpm(equipment_id, (err, rows) => {
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
}

async function setDpmID(data) {
  return new Promise((resolve, reject) => {
    try {
      SetData.setDpmID(data, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
}

async function getEquipDepart(data) {
  return new Promise((resolve, reject) => {
    try {
      SetData.getEquipDepart(data, (err, rows) => {
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
}

module.exports = router;
