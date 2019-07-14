const inquirer = require("inquirer");
const cmd = require("node-cmd");
const fs = require("fs");

// Cli Model
const cliModel = require("../cliModel");
const installOption = cliModel.installOption;
const stateOption = cliModel.stateManagement;
const unstatedOption = cliModel.unstatedOptions;

// Cli Install Commands
const { unstatedObj, reduxThunkObj } = require("../cliModel/install-commands");

// Destructuring the Unstated Object
const { unstated, unstatedNext } = unstatedObj;

//State Management Dependencies
const Redux = require("./StateManagement-Dependencies/redux");
const ReduxThunk = require("./StateManagement-Dependencies/reduxThunk");
const Unstated = require("./StateManagement-Dependencies/unstated");
const UnstatedNext = require("./StateManagement-Dependencies/unstatedNext");

const prompt = inquirer.createPromptModule();
module.exports = class StateManagement {
  prompt() {
    prompt(stateOption).then(({ state }) => {
      if (state === "Redux") {
        new Redux().installOrUninstall();
      } else if (state === "Unstated") {
        prompt(unstatedOption).then(({ state }) => {
          if (state === "Unstated") {
            new Unstated().installOrUninstall();
          } else if (state === "Unstated-next") {
            new UnstatedNext().installOrUninstall();
          }
        });
      } else if (state === "Redux-Thunk") {
        new ReduxThunk().installOrUninstall();
      }
    });
  }
};
