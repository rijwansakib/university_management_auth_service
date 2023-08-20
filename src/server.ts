import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { loggerInfo, loggerError } from './shared/logger'
import { Server } from 'http'
async function main() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    loggerInfo.info(`Database connected successfully`)

    server = app.listen(config.port, () => {
      loggerInfo.info(`Application app listening on port ${config.port}`)
    })
  } catch (error) {
    loggerError.error('Faield to  connected database', error)
  }

  process.on('unhandled rejection', error => {
    console.log('we arem closing our server.........')

    if (server) {
      server.close(() => {
        loggerError.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()
