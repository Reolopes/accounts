const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const quest = require('../app')



function widrawAccount() {
    inquirer.prompt([
        { name: "name", message: "Qual o nome da conta?" },
        { name: "senha", message: "Qual a sua senha?" }
    ]).then(resp => {
        const nomeConta = resp.name
        const authSenha = resp.senha
        const accountExists = fs.existsSync(`./accounts/${resp.name}.txt`, () => {
            return true
        })

        if (accountExists) {
            fs.readFile(`./accounts/${resp.name}.txt`, function (err, data) {
                data = JSON.parse(data)
                saldo = Number(data.saldo)
                if (err) {
                    console.log(err.message)
                }

                if (data.senha === authSenha) {
                    console.log(chalk.green(`\nConta encontrada!\n`))
                    inquirer.prompt([
                        { name: "saldo", message: "Qual valor deseja sacar?" }
                    ]).then(resp => {
                        resp.saldo = Number(resp.saldo)
                        if (resp.saldo <= saldo) {
                            saldo -= resp.saldo
                            fs.writeFile(`./accounts/${nomeConta}.txt`, JSON.stringify({ name: nomeConta, senha: authSenha, saldo: saldo }), { flag: "w" }, (err, data) => {
                                console.log(chalk.bgGreen('\nValor Retirado\n'))
                                return quest.menu()
                            })
                        } else {
                            console.log(chalk.yellow("\nValor inválido ou excedente ao saldo disponível\n"))
                            return quest.menu()
                        }
                    })
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

exports.widrawAccount = widrawAccount