const msg = document.querySelector('.msg');
        const guess = document.querySelector('input');
        const btn = document.querySelector('.btn');
        let play = false;
        let newWords = "";
        let randWords = "";
        let words = ['python', 'javascript', 'c++', 'php', 'java', 'c#', 'html', 'css', 'reactjs', 'angular', 'swift', 'android', 'sql'];

        const createNewWords = () => {
            let randNum = Math.floor(Math.random() * words.length);
            //console.log(ranNum);
            let newTempWords = words[randNum]; //Randomly display words
            //console.log(newTempWords.split(""));
            return newTempWords;

        }

        const scrambleWords = (arr) => {
            for (let i = arr.length - 1; i >= 0; i--) { //Reverse the words of the string 
                let temp = arr[i];
                let j = Math.floor(Math.random() * (i + 1));
                //console.log(i); //exact random number
                //console.log(j); //random number - shuffled index number
                arr[i] = arr[j];
                arr[j] = temp;

            }
            return arr; //i array is returned

        }

        btn.addEventListener('click', function() {
            if (!play) {
                console.log(play);
                console.log(!play);
                play = true;
                btn.innerHTML = "Guess";
                guess.classList.toggle('hidden');
                newWords = createNewWords();
                randWords = scrambleWords(newWords.split("")).join("");
                //console.log(randWords.join(""));
                msg.innerHTML = `Guess the word: ${randWords}`;
                //msg.innerHTML = randWords;
            }else{
                let tempWords = guess.value; //value of input field
                console.log(tempWords);
                console.log(newWords);
                console.log(tempWords===newWords);
                if(tempWords===newWords) {
                    console.log("correct");
                    play = false;
                    msg.innerHTML = `Congratulation, Its correct. It is ${newWords}`;
                    btn.innerHTML = "Start Again";
                    guess.classList.toggle('hidden');
                    guess.value = "";

                }
                else {
                    console.log("wrong");
                    play = false;
                    msg.innerHTML = `Sorry, Its incorrect. It is ${newWords}. Try Again`;
                    btn.innerHTML="Start Again";
                    guess.classList.toggle('hidden');
                    guess.value = "";
                }
            
            }
        })