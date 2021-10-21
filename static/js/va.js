const speechRecognition =
window.webkitSpeechRecognition  ||
 window.SpeechRecognition;
function startListening(){
const recog=new speechRecognition();
recog.start();
recog.onstart=console.log("Started Listening...");
recog.onresult=function(data){
handleResults(data);
};
}
function handleResults(data){
let text=data.results[0][0].transcript;
text=text.toLowerCase();
ProcessCommand(text);
}
function ProcessCommand(UserText){
if (UserText.includes("scramble")){
Speak("opening scramble game for you right away! expand your mind and improve your vocabulary");
window.open("https://buddies-hub-shm.herokuapp.com/scramble");
}
else if (UserText.includes("memory")){
Speak("opening memory game for you right away! give your 100 percent attention");
window.open("https://buddies-hub-shm.herokuapp.com/memory");
}
else if (UserText.includes("maths")){
    Speak("opening maths game for you right away! Do your calculations well");
    window.open("https://buddies-hub-shm.herokuapp.com/maths");
    }
    else if (UserText.includes("tic tac toe")){
        Speak("opening tic tac toe game for you right away! Let's see if you can defeat the computer! good luck for that");
        window.open("https://buddies-hub-shm.herokuapp.com/ticAI");
        }
        else if (UserText.includes("exit")){
            Speak("going back");
            window.open("https://buddies-hub-shm.herokuapp.com");
            }
else if(UserText.includes("the")&& UserText.includes("time")){
Speak("The Time Is: " +    getCurentTime());
}
}
function getCurentTime(){
const date=new Date();
let hour=date.getHours();
let minutes=date.getMinutes();
return `${hour} ${minutes}`;
}
function Speak(TEXT){
const utter=new SpeechSynthesisUtterance();
utter.text=TEXT;
window.speechSynthesis.speak(utter);
} 
microphoneButton.addEventListener("click",startListening);