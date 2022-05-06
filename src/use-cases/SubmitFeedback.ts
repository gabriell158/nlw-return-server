import { throws } from "assert";
import { MailAdapter } from "../adapters/mail";
import { FeedbackRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedback {
    constructor(private feedbackRepository: FeedbackRepository, private mailAdapter: MailAdapter) { }
    async execute(request: SubmitFeedbackRequest) {
        const { type, comment, screenshot } = request
        if (!type) {
            throw new Error('Type is required')
        }
        if (!comment) {
            throw new Error('Comment is required')
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format')
        }
        const screenshotText = screenshot ? `<img src="${screenshot}"/>` : ""
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: `<div style="font-family: sans-serif; font-size: 16px; color: #111;">\n<p>Tipo do feedback: ${type} </p>\n<p>Comentario: ${comment}</p>${screenshotText}</div>`
        })
    }
}