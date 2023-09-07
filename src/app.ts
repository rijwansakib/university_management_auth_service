import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleWares/globalErrorHandlers'
import routers from './app/routes'
import httpStatus from 'http-status'
import cookierParser from 'cookie-parser'
const app: Application = express()

app.use(cors())
app.use(cookierParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route

app.use('/api/v1/', routers)

// app.use('/api/v1/users/', UsersRoutes)
// app.use('/api/v1/academic-semesters/', semesterRoutes)

// //Testing
// app.get('/',async(req: Request, res: Response,next:NextFunction) => {
//    console.log(x);

// })

//gloabl error handler

app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})
export default app
