export class Robot {
    constructor() {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this.speechSynthesis = window.speechSynthesis;
        this.speechSynthesis.rate = 1;
        this.recognition = new SpeechRecognition();
    }
    say(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.6
        this.speechSynthesis.speak(utterance)
    }
    listen() {
        return new Promise((resolve, reject) => {
            this.recognition.start();
            this.recognition.onresult = (event) => {
                console.log("All results", event.results)
                const speechToText = event.results[0][0].transcript;
                console.log("Speech to text", speechToText)
                if (event.results[0].isFinal) {
                    resolve(speechToText);
                }
            }
            this.recognition.onerror=(event)=>{
                console.log('Speech recognition error detected: ' + event.error);
                reject(event.error);
            }
        });
    }
}

export class RobotMock {
    index=0;
    constructor() {
        
    }
    say(text) {
        console.log("Atm talking: "+text)
    }
    listen() {
        let results=["1234", "Withdrawal"];
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const speechToText=results[this.index++];
                console.log("Speech to text", speechToText)
                resolve(speechToText);

            }, 500);
        });
    }
}