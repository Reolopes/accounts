const inquirer = require('inquirer')
const chalk = require('chalk')
const deposit = require('./modules/deposit')
const create = require('./modules/create')
const del = require('./modules/delete')
const widraw = require('./modules/withdraw')
const query = require('./modules/query')



menu()

function menu() {
    inquirer.prompt([
        {
            type: "list", name: "name", message: "Escolha uma Opção:",
            choices: [
                "Criar Conta", "Consultar Saldo", "Depositar", "Sacar", "Excluir Conta", "Sair"
            ]
        }
    ]).then(resp => {
        if (resp.name === "Criar Conta") {
            return create.newAccount()
        } else if (resp.name === "Consultar Saldo") {
            return query.consult()
        } else if (resp.name === "Depositar") {
            return deposit.depositAccount()
        } else if (resp.name === "Sacar") {
            return widraw.widrawAccount()
        } else if (resp.name === "Excluir Conta") {
            return del.delAccount()
        } else if (resp.name === "Sair") {
            return console.log(chalk.green("\nOperação Finalizada\n"))
        }
    })
}

exports.menu = menu
