import { Response } from "express"

const respond = <T>(res: Response, message: string, data: T) => {

  return res.status(200).json({code: 0, message, data})

}

export default respond

