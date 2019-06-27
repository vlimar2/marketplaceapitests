//const sleep = require('system-sleep')
module.exports = { 
  findByPartcipante: async function (cpf) {
    //console.log("- LOG Truckers - Iniciada...")
    const query = {
      'CPF': cpf
    }
    const logTruckers = await this.find(query).exec()
    //console.log("✓ LOG Truckers - Finalizado! ".blue)
    return logTruckers
  }
}