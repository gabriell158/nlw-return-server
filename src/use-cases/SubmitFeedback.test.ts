import { SubmitFeedback } from "./SubmitFeedback"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedback(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'a comment',
            screenshot: 'data:image/png;base64/asdasdimg.png',
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    it('should be not able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'a comment',
            screenshot: 'data:image/png;base64/asdasdimg.png',
        })).rejects.toThrow();
    })
    it('should be not able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64/asdasdimg.png',
        })).rejects.toThrow();
    })
    it('should be not able to submit a feedback with an invalid scheenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'a comment',
            screenshot: 'asdasdasdasdasdimg.png',
        })).rejects.toThrow();
    })
})