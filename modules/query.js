const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const quest = require('../app')



function consult() {
    inquirer.prompt([
        { name: "name", message: "Qual o nome da conta?" },
        { name: "senha", message: "Qual a sua senha?" }
    ]).then(resp => {
        const authSenha = resp.senha
        const accountExists = fs.existsSync(`./accounts/${resp.name}.txt`, () => {
            return true
        })
        if (accountExists) {
            fs.readFile(`./accounts/${resp.name}.txt`, function (err, data) {
                data = JSON.parse(data)
                if (err) {
                    console.log(err.message)
                }

                if (data.senha === authSenha) {
                    console.log(chalk.green(`\nO seu saldo é de: R$ ${data.saldo} reais\n`))
                    return quest.menu()
                } else {
                    console.log(chalk.bgRed("\nSenha incorreta\n"))
                    return quest.menu()
                }
            })
        } else {
            console.log(chalk.bgRed('\nConta não existente ou senha incorreta!\n'))
            return quest.menu()
        }
    })
}

exports.consult = consult