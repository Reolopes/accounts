const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const quest = require('../app')


function newAccount() {
    const conta = inquirer.prompt([
        { name: "name", message: "Qual o seu nome? " },
        { name: "senha", message: "Insira uma senha:" },
    ]).then(resp => {
        resp.saldo = 0
        const fileExists = fs.existsSync(`./accounts/${resp.name}.txt`, () => {
            return true
        })
        if (fileExists) {
            console.log(chalk.red("\nConta já existente\n"))
            quest.menu()
        } else {
            fs.writeFile(`./accounts/${resp.name}.txt`, JSON.stringify(resp), (err) => {
                if (err) {
                    console.log(err.message)
                }
                console.log(chalk.green("\nConta criada com sucesso!\n"))
                quest.menu()
            })
        }
    })
}

exports.newAccount = newAccount