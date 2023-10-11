import express, {Request,Response} from 'express'
import cors from 'cors'
import { AppError } from '../errors/AppError'
import routes from './routes'
import '../typeorm'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

interface RequestError extends Error {
  status: number;
}

app.use((error: RequestError, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      status: 'error',
      message: error.message
    })
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
