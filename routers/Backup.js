const express = require("express");
const router = express.Router();
var fs = require("fs");

router.post("/", (req, res) => {
  var backup_type = req.body.backup_type;
  ////Backup ประวัติการเข้าสู่ระบบ
  if (backup_type == 1) {
    try {
      let username = req.body.username;
      let user_id = req.body.user_id;
      let login_date = req.body.login_date;

      if (fs.existsSync("./login.csv")) {
        //file exists.
        console.log("exist");

        let logger = fs.createWriteStream("login.csv", {
          flags: "a", // 'a' means appending (old data will be preserved)
        });
        let writeLine = (line) => logger.write(`\n${line}`);

        if (username.includes("admin")) {
          writeLine(`${user_id},admin,${login_date}`);
        } else if (username.includes("dpm")) {
          writeLine(`${user_id},department,${login_date}`);
        } else {
          writeLine(`${user_id},member,${login_date}`);
        }

        res.json({ status: "Succeed", data: "Succeed" });
      } else {
        //file empty.
        console.log("empty");

        let logger = fs.createWriteStream("login.csv", {
          flags: "a", // 'a' means appending (old data will be preserved)
        });
        logger.write("user_id,user_type,login_date"); // append string to your file
        let writeLine = (line) => logger.write(`\n${line}`);

        if (username.includes("admin")) {
          writeLine(`${user_id},admin,${login_date}`);
        } else if (username.includes("dpm")) {
          writeLine(`${user_id},department,${login_date}`);
        } else {
          writeLine(`${user_id},member,${login_date}`);
        }

        res.json({ status: "Succeed", data: "Succeed" });
      }
    } catch (err) {
      //console.log(err);
      res.json({ status: "Failed", data: "Error Code" });
    }
  }
  //Backup ประวัติการแก้ไขข้อมูล
  else if (backup_type == 2) {
    try {
      let admin_id = req.body.admin_id;
      let edit_data = req.body.edit_data;
      let edit_date = req.body.edit_date;

      if (fs.existsSync("./edit_data.csv")) {
        //file exists
        console.log("exists");

        let logger = fs.createWriteStream("edit_data.csv", {
          flags: "a", // 'a' means appending (old data will be preserved)
        });
        let writeLine = (line) => logger.write(`\n${line}`);
        writeLine(`${admin_id},${edit_data},${edit_date}`);

        res.json({ status: "Succeed", data: "Succeed" });
      } else {
        //file empty.
        console.log("empty");

        let logger = fs.createWriteStream("edit_data.csv", {
          flags: "a", // 'a' means appending (old data will be preserved)
        });
        logger.write("admin_id,edit_data,edit_date"); // append string to your file
        let writeLine = (line) => logger.write(`\n${line}`);
        writeLine(`${admin_id},${edit_data},${edit_date}`);

        res.json({ status: "Succeed", data: "Succeed" });
      }
    } catch (err) {
      //console.log(err);
      res.json({ status: "Failed", data: "Error Code" });
    }
  } else {
    res.json({ status: "Failed", data: "กำหนด backup_type แค่ 1, 2" });
  }
});

module.exports = router;
