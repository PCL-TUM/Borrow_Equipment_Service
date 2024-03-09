const express = require("express");
const router = express.Router();
const Borrowing = require("../models/Borrowing");
const Utility = require("../controllers/Utility");

router.post("/insertData", async function (req, res, next) {
  let resCheckBor = await Utility.checkBorrowSame(req.body);

  if (resCheckBor[0]["id"] > 0) {
    res.json({ status: "Failed", data: "Equip is borrowed" });
  } else {
    let resBorrowing = await insertDataBorrow(req.body);
    if (resBorrowing) {
      res.json({ status: "Succeed", data: "Insert Pass" });
    } else {
      res.json({ status: "Failed", data: "Insert Fail" });
    }
  }
});

async function insertDataBorrow(data) {
  return new Promise((resolve, reject) => {
    try {
      Borrowing.insertDataBorrow(data, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

module.exports = router;
