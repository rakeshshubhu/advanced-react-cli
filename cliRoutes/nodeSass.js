const inquirer = require("inquirer");
const cmd = require("node-cmd");

// Cli Model
const cliModel = require("../cliModel");
const installOption = cliModel.installOption;
const YarnOrNpm = cliModel.YarnOrNpm;

// CLI Install Commands
const { nodeSassObj } = require("../cliModel/install-commands");

const { nodeSassObjYarn } = require("../cliModel/install-commands-yarn");

const prompt = inquirer.createPromptModule();

/*

  Installs/Uninstalls Node-Sass package

*/

module.exports = class NodeSass {
  installOrUninstall() {
    prompt(YarnOrNpm).then(({ packageManager }) => {
      const packageInstaller = packageManager;
      prompt(installOption).then(({ decision }) => {
        if (decision === "Install") {
          this.install(packageInstaller);
        } else if (decision === "Uninstall") {
          this.uninstall(packageInstaller);
        }
      });
    });
  }

  install(packageInstaller) {
    switch (packageInstaller) {
      case "NPM":
        cmd.get(`${nodeSassObj.install}`, (err, data, stderr) => {
          err ? console.log(err) : console.log(stderr, data);
        });
        console.log("Package: node-sass has been installed successfully!");
        break;

      case "Yarn":
        cmd.get(`${nodeSassObjYarn.install}`, (err, data, stderr) => {
          err ? console.log(err) : console.log(stderr, data);
        });
        console.log("Package: node-sass has been installed successfully!");
        break;
    }
  }

  uninstall(packageInstaller) {
    switch (packageInstaller) {
      case "NPM":
        cmd.get(`${nodeSassObj.uninstall}`, (err, data, stderr) => {
          err ? console.log(err) : console.log(stderr, data);
        });
        console.log("Package: node-sass has been uninstalled successfully!");
        break;

      case "Yarn":
        cmd.get(`${nodeSassObjYarn.uninstall}`, (err, data, stderr) => {
          err ? console.log(err) : console.log(stderr, data);
        });
        console.log("Package: node-sass has been uninstalled successfully!");
        break;
    }
  }
};
