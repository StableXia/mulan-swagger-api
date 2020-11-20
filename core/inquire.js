const inquirer = require('inquirer');

module.exports.askOverride = async function ({ message = '是否覆盖' }) {
  try {
    const { override } = await inquirer.prompt({
      type: 'confirm',
      name: 'override',
      message,
    });

    return override;
  } catch (err) {
    return false;
  }
};

module.exports.askCheckbox = async function ({
  choices = [],
  message = '请选择',
}) {
  try {
    const { selected } = await inquirer.prompt({
      type: 'checkbox',
      name: 'selected',
      message,
      choices: [{ name: '全选' }, ...choices],
    });

    return selected;
  } catch (err) {
    return [];
  }
};
