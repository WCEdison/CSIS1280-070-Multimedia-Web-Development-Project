class Hobby {
    constructor(name, requirements, page) {
      this.name = name;
      this.requirements = requirements;
      this.page = page;
    }
}

const hiking = new Hobby("Hiking", ["outdoors", "highDexterity"], "hobbies_hiking.html");
const travelling = new Hobby("Travelling", ["outdoors", "lowDexterity"], "hobbies_traveling.html");
const painting = new Hobby("Painting", ["indoors", "highDexterity"], "hobbies_painting.html");
const reading = new Hobby("Reading", ["indoors", "lowDexterity"], "hobbies_reading.html");
const videograph = new Hobby("Videograph", ["both", "highDexterity"], "hobbies_videography.html");

const hobbies = [hiking, travelling, painting, reading, videograph];

function resetQuizz() {
    document.querySelector("#name").value = "";
    document.querySelector("#studentId").value = "";
    document.querySelector('#indoors'). checked = false;
    document.querySelector('#outdoors').checked = false;
    document.querySelector('#both').checked = false;
    document.querySelector('#manual').selectedIndex=0;
    document.querySelector("#name").focus();

    let responseSection = document.getElementById("response");
    let emptySection = document.getElementById("empty-response");
    let btnSubmit = document.getElementById("submit-button");
    btnSubmit.disabled = false;

    responseSection.style.display = "none";
    emptySection.style.display = "none";
}

function disableSubmission() {
    const btnSubmit = document.getElementById("submit-button");
    btnSubmit.disabled = true;
}

function processQuizz() {

    //Prevent default form submission
    event.preventDefault()

    //Capturing input values
    const name = document.querySelector("#name").value;
    const studentId = document.querySelector("#studentId").value;
    const kind = document.querySelector('input[name="kind"]:checked').value;
    const manual = document.querySelector('#manual').value;

    //Hobby choise based on inputs
    const requirements = [kind, manual];
    const hobbyChoice = filterHobbies(requirements);

    //Disables submit button
    disableSubmission();
    //Displays user name
    // document.getElementById("userName").innerHTML = name;

    //When no hobby matches
    if (hobbyChoice.length==0) {
        let section = document.getElementById("empty-response");
        while (section.firstChild) {
            section.removeChild(section.lastChild);
        }
        const html = `<hr><p>Dear ${name}, we are so sorry to inform but unfortunately 
        at this point we have no Hobby registered on our database that best fits your profile.</p><br>
        <p>We also encourage you to search for more information on the frontdesk using your id ${studentId}.</p>
        <button onclick="resetQuizz()">Reset</button>`;
        section.insertAdjacentHTML("afterbegin", html);
        section.style.display = "block";
        return;
    }

    //When a match is found
    const section = document.getElementById("response");
    while (section.firstChild) {
        section.removeChild(section.lastChild);
    }
    const html = `<br><hr><br><a href="${hobbyChoice[0].page}">${hobbyChoice[0].name}</a><br><br>Dear ${name}, based on your inputs, we 
    understand that ${hobbyChoice[0].name} is the hobby that best fit for your profile. Please, click the link to 
    access more information. <br><br><button onclick="resetQuizz()">Reset</button>`;
    section.insertAdjacentHTML("afterbegin", html);
    section.style.display = "block";
}

function filterHobbies(req) {
    filteredHobbies = [];

    for (h in hobbies) {
        if (hobbies[h].requirements[0] == req[0]) {
            if (hobbies[h].requirements[1] == req[1]) {
                filteredHobbies.push(hobbies[h]);
            }
        }
    }

    return filteredHobbies;
}