export class Robot{
    constructor(){
        this.speechSynthesis=window.speechSynthesis;
        this.speechSynthesis.rate=1;
    }
    say(text){
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate=0.6
        this.speechSynthesis.speak(utterance)
    }
}