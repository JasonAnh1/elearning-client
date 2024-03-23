export default class Question {
    constructor(id, question, answer, type, lessonId, choices) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.type = type;
        this.lessonId = lessonId;
        this.choices = choices;
    }
}
