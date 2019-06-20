export class Robot {
    constructor() {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this.speechSynthesis = window.speechSynthesis;
        this.speechSynthesis.rate = 1;
        const recognition = new SpeechRecognition();
        this.recognizing=false;
        recognition.onstart = function () {
            this.recognizing = true;
        };
        
        recognition.onend = function () {
            this.recognizing = false;
        };
        
        recognition.onerror = function (event) {
            this.recognizing = false;
        };
        this.recognition=recognition;
    }
    say(text) {
        return new Promise((resolve, reject) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.6
            this.speechSynthesis.speak(utterance)
            utterance.addEventListener('end', resolve)
        });       
    }
    islistening(){
        return this.recognizing;
    }
    listen() {
        return new Promise((resolve, reject) => {
            if(this.islistening()){
                const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
                this.recognition.stop()
                this.recognition = new SpeechRecognition();
            }
            this.recognition.addEventListener('result', function (event) {
                this.recognizing = true;
                console.log("All results", event.results)
                const speechToText = event.results[0][0].transcript;
                console.log("Speech to text", speechToText)
                if (event.results[0].isFinal) {
                    resolve(speechToText);
                }
            });
            this.recognition.addEventListener('error', function (event) {
                this.recognizing = false;
                console.log('Recognition error');
                reject("Error occured while recognizing speech");
             });
             this.recognition.addEventListener('nomatch', function () {
                this.recognizing = false;
                console.log('Error: sorry but I could not find a match');
                reject('Sorry but I could not find a match');
             });
             this.recognition.addEventListener('end', function () {
                this.recognizing = false;
                console.log('Error: sorry but I could not recognize your speech');
                reject('Sorry but I could not recognize your speech');
             });
            try {
                this.recognition.start();
            } catch (error) {
                console.error(error)
            }
           
            console.log("Speach recognition server started")
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
        let results=["1234", "withdrawal","Savings",1000];
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const speechToText=results[this.index++];
                console.log("Speech to text", speechToText)
                resolve(speechToText);

            }, 500);
        });
    }
}