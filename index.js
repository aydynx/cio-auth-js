import fs from "fs";
import fetch from "node-fetch";
import prompts from "prompts";
import { exec } from "child_process";
import chalk from "chalk";

class Auth {
  async login(premium = true) {
    let key = "";
    let keyRegex = /^CRACKED-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-TO$/;

    if (fs.existsSync("key.cio") && fs.readFileSync("key.cio").toString() !== "") {
      key = fs.readFileSync("key.cio", "utf-8");
    } else if (key !== "") {
      key = key;
    } else {
      let answer = await prompts({
        type: "text",
        name: "key",
        message: "Enter your key: ",
        validate: (key) => {
          if (keyRegex.test(key)) {
            return true;
          } else {
            console.log("\ninvalid key");
            process.exit(1);
          }
        },
      });
      key = answer.key;
    }

    let hwid = exec("wmic diskdrive get serialnumber", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      hwid = stdout.split("\n")[1].trim();
    });

    let response = await fetch("https://cracked.io/auth.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        a: "auth",
        k: key,
        hwid: hwid,
      }),
    });
    let data = await response.json();

    if (data.error) {
      console.log(data.error);

      if (fs.existsSync("key.cio")) {
        fs.rmSync("key.cio");
      }
      process.exit(1);
    }

    let groups;

    if (premium) {
      groups = [
        "12", //supreme
        "11", //infinty
        "93", //premium
        "96",
        "97",
        "99",
        "100",
        "101",
        "4",
        "3",
        "6",
        "94",
        "92",
      ];
    } else {
      groups = [];
    }

    if (data.auth) {
      fs.writeFileSync("key.cio", key);
      if (groups.some((g) => data.group.includes(g))) {
        fs.writeFileSync("key.cio", key);
        console.log("Authentication successful!\n");
        if (data.group == "12") {
          //supreme
          console.log(`welcome, ${chalk.rgb(97, 253, 160)(data.username)}`);
        } else if (data.group == "11") {
          //infinity
          console.log(`welcome, ${chalk.rgb(253, 133, 159)(data.username)}`);
        } else if (data.group == "93") {
          //premium
          console.log(`welcome, ${chalk.rgb(93, 217, 218)(data.username)}`);
        } else {
          //others
          console.log(`welcome, ${chalk.rgb(44, 87, 114)(data.username)}`);
        }
        return true;
      }
    } else {
      console.log("Authentication failed!");
      process.exit(1);
    }
  }
}

export default new Auth();
