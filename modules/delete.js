const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const quest = require('../app')



function delAccount() {
    inquirer.prompt([
        { name: "name", message: "\nPara a exclusão, digite o nome da conta!" },
        { name: "senha", message: "\nConfirme a senha para prosseguir" }
    ]).then(resp => {
        const authSenha = resp.senha
        const fileExists = fs.existsSync(`./accounts/${resp.name}.txt`, () => {
            return
        })
        if (fileExists) {
            fs.readFile(`./accounts/${resp.name}.txt`, (err, data) => {
                if (err) {
                    console.log(err.message)
                }
                data = JSON.parse(data)

                if (data.senha === authSenha) {
                    if (data.saldo > 0) {
                        console.log(chalk.yellow("\nPara a exclusão, é necessário que retire o saldo por completo!\n"))
                        return quest.menu()
                    } else {
                        fs.unlink(`./accounts/${resp.name}.txt`, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log(chalk.green("\nExcluída com Sucesso\n"))
                            return quest.menu()
                        })
                    }
                } else {
                    console.log(chalk.red("\nSenha incorreta\n"))
                    return quest.menu()
                }
            })
        } else {
            console.log(chalk.red("\nConta não encontrada\n"))
            return quest.menu()
        }
    })
}

exports.delAccount = delAccount