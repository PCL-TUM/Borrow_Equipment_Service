const express = require("express");
const router = express.Router();
const GetData = require("../models/GetData");

//แสดงข้อมูล Member
router.post("/DataMember", async function (req, res) {
  let rfid = req.body.rfid;
  let search_value = req.body.search_value;
  let dataMember;
  if (rfid != "") {
    dataMember = await getDataMember(rfid);
  } else if (search_value != "") {
    dataMember = await searchDataMember(search_value);
  } else {
    dataMember = await getDataMemberAll();
  }

  if (dataMember != null) {
    if (dataMember.length > 0) {
      res.json({ status: "Succeed", data: dataMember });
    } else {
      res.json({ status: "Failed", data: "No user information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูล Equipment
router.post("/DataEquip", async function (req, res) {
  let rfid = req.body.rfid;
  let search_value = req.body.search_value;
  let dataEquip;
  if (rfid != "") {
    dataEquip = await getDataEquip(rfid);
  } else if (search_value != "") {
    dataEquip = await searchDataEquip(search_value);
  } else {
    dataEquip = await getDataEquipAll();
  }

  if (dataEquip != null) {
    if (dataEquip.length > 0) {
      res.json({ status: "Succeed", data: dataEquip });
    } else {
      res.json({ status: "Failed", data: "No Equip information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูล Equipment ที่คงเหลือในตาราง
router.post("/DataEquipRemain", async function (req, res) {
  let search_value = req.body.search_value;
  let equipdata;

  if (search_value == "") {
    equipdata = await getDataEquipRemainAll();
  } else {
    equipdata = await searchDataEquipRemain(search_value);
  }
  if (equipdata != null) {
    if (equipdata.length > 0) {
      res.json({ status: "Succeed", data: equipdata });
    } else {
      res.json({ status: "Failed", data: "No Equip information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูลการยืม
router.post("/DataBorrowing", async function (req, res) {
  let dataBorrowing = await getDataBorrowing();
  if (dataBorrowing != null) {
    if (dataBorrowing.length > 0) {
      res.json({
        status: "Succeed",
        data: dataBorrowing,
      });
    } else {
      res.json({ status: "Succeed", data: "No Borrowing information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูลการคืน
router.post("/DataReverting", async function (req, res) {
  let dataReverting = await getDataReverting();
  if (dataReverting != null) {
    if (dataReverting.length > 0) {
      res.json({
        status: "Succeed",
        data: dataReverting,
      });
    } else {
      res.json({ status: "Succeed", data: "No Reverting information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูลรายงาน
router.post("/DataReport", async function (req, res, next) {
  let typeSearch = req.body.typeSearch;
  var typeSearchList = ["0", "1", "2", "3"];

  if (typeSearchList.includes(typeSearch)) {
    let dataReport = await SearchDataReport(req.body);

    if (dataReport != null) {
      if (dataReport.length > 0) {
        res.json({ status: "Succeed", data: dataReport });
      } else {
        res.json({ status: "Failed", data: "No Report information" });
      }
    } else {
      res.json({ status: "Failed", data: "Error" });
    }
  } else {
    res.json({ status: "Failed", data: "กำหนด typeSearch ระหว่าง 0-3" });
  }
});

//แสดงข้อมูลการแจ้งเตือน
router.post("/DataNoti", async function (req, res) {
  let dataNoti = await getDataNoti();
  if (dataNoti != null) {
    if (dataNoti.length > 0) {
      res.json({
        status: "Succeed",
        data: dataNoti,
      });
    } else {
      res.json({ status: "Succeed", data: "No notification information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

async function getDataMember(rfid) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataMember(rfid, (err, rows) => {
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

async function searchDataMember(search_value) {
  return new Promise((resolve, reject) => {
    try {
      GetData.searchDataMember(search_value, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function getDataMemberAll() {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataMemberAll((err, rows) => {
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

async function getDataEquipRemain(equipID) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquipRemain(equipID, (err, rows) => {
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

async function getDataEquip(rfid) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquip(rfid, (err, rows) => {
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

async function getDataEquipAll() {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquipAll((err, rows) => {
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

async function getDataEquipRemainAll() {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquipRemainAll((err, rows) => {
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

async function searchDataEquip(search_value) {
  return new Promise((resolve, reject) => {
    try {
      GetData.searchDataEquip(search_value, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function searchDataEquipRemain(search_value) {
  return new Promise((resolve, reject) => {
    try {
      GetData.searchDataEquipRemain(search_value, (err, rows) => {
        console.log(err);
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

async function getDataReverting() {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataReverting((err, rows) => {
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

async function SearchDataReport(data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.SearchDataReport(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function getDataBorrowing() {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataBorrowing((err, rows) => {
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

async function getDataNoti() {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataNoti((err, rows) => {
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
