import { Router } from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/mail'
import { PrismaFeedbacksRepository } from './repositories/Prisma/PrismaFeedbacksRepository'
import { SubmitFeedback } from './use-cases/SubmitFeedback'
export const router = Router()


router.post('/feedback', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedback = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedback = new SubmitFeedback(prismaFeedback, nodemailerMailAdapter)

    await submitFeedback.execute({
        type,
        comment,
        screenshot
    })

    return res.send(

    )
})