let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = "7b01b114-5443-45c5-ab58-24ceea24462b";
let notFound = document.querySelector('.notFound');
let defBox = document.querySelector('.def');
let soundBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');



searchBtn.addEventListener('click',function(e){
    e.preventDefault();


    //clear data
    soundBox.innerHTML = "";
    notFound.innerText = "";
    defBox.innerText = "";

    let word = input.value;
    if(word === ' ')
     {   alert("Word is required search");
        return;    
    }
    
    getData(word);
    
});

async function getData(word){

    loading.style.display = 'block';

    const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);

    const data = await response.json();

    
    // If empty result
    if(!data.length){
    
        loading.style.display = 'none';
        notFound.innerText = " No result found "
        return;
    }

    //If object is result
    // If result is suggestion
    if(typeof data[0] === 'string'){
        loading.style.display = 'none';
        let heading  = document.createElement('h3');
        heading.innerText = "Did you mean?"
        notFound.appendChild(heading);
        data.forEach( element => {
            let suggestion = document.createElement("span");
            suggestion.classList.add('suggest');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);

        })
        return;
    }

    //  Result Found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }

    console.log(data);
}

function renderSound(soundName){

    let subFolder = soundName.charAt(0);
    //We search in Apple in "a" subfolder
    //Read Documentation
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;

    soundBox.appendChild(aud);
}

//https://media.merriam-webester.com/soundc11

// https://dictionaryapi.com/api/v3/references/collegiate/json/test?key=7b01b114-5443-45c5-ab58-24ceea24462b