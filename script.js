// global declaration of input boxes.

let FullName = document.getElementById('FullName');
let EmailAddress = document.getElementById('EmailAddress');
let GitHubUsername = document.getElementById('GitHubUsername');

// declaration of error alert inputs.
let NameError = document.getElementById('NameError');
let EmailError = document.getElementById('EmailError');
let GitHubError = document.getElementById('GitHubError');

//ticket display text outputs, name, email...
let CongratsMessage = document.getElementById('CongratsMessage');
let TicketMailed = document.getElementById('TicketMailed');
let UsernameTicket = document.getElementById('UsernameTicket');
let GitHubTicket = document.getElementById('GitHubTicket');
let TicketNumber = document.getElementById('TicketNumber');
let ProfileUpdated = document.getElementById('ProfileUpdated');


//Declaration of ticket and form variables.
let TheForm = document.getElementById('TheForm');
let TheTicket = document.getElementById('TheTicket');


//file recieved variables.
const DropArea = document.getElementById('DropArea');
const FileInput= document.getElementById('FileInput');
const UploadTrigger = document.getElementById('UploadTrigger');
const ImageContainer = document.getElementById('ImageContainer');
let LargeAvatar = document.getElementById('LargeAvatar');
let EmptyAvatar = document.getElementById('EmptyAvatar');
let InvalidAvatar = document.getElementById('InvalidAvatar');
let Info = document.getElementById('Info');
let ThePicture = document.getElementById('ThePicture');
let ImageButtons = document.getElementById('ImageButtons');
let RemoveImage = document.getElementById('RemoveImage');
let ChangeImage = document.getElementById('ChangeImage');
let TicketImage = document.getElementById('TicketImage');

//Random Ticket Numbers.
const Tickets =[' #50659',' #53159',' #53175',' #83198',' #83103',' #10586',' #54934',' #04844',' #8384',' #68474',' #54839',' #67984',' #76974',' #63264',' #04843',' #76346',' #23673',' #94834',' #84843',' #67986',' #73473',' #24324',' #60976',' #35326',' #23545',' #07864'];

//LowerCase email address.
EmailAddress.addEventListener('input',function(){
  {
    this.value=this.value.toLowerCase();
  }
});


// valid email Address.
function isEmail(){
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(EmailAddress.value);
}

// username validation.
function IsUserName(){
  if(FullName.value.trim()===""){
    return false;
  }
  else{
    return true;
  }
}

//Valid Github Username.
GitHubUsername.addEventListener('input',function(){
  if(this.value[0]!=='@'){
    this.value='@'+this.value.trim();
  }
  
  this.value=this.value[0]+this.value.slice(1)
        .replace(/[^a-zA-Z\d-]/g,'')
        .replace(/--+/g,'-')
        .replace(/^-+|-+$/g,'');
});

// empty github username.
function IsGitHub(){
  if(GitHubUsername.value.trim()===""|| GitHubUsername.value.trim()==='@'){
    return false;
  }
  else{
    return true;
  }
}

// error alert funtion.
function ErrorAlert(thevalue,theattribute,thevalidation){
  if(thevalidation==false){
    thevalue.style.borderColor="red";
    theattribute.classList.remove('TicketHidden');
    thevalue.style.marginBottom="0px";
  }
  else{
    thevalue.style.borderColor="initial";
    theattribute.classList.add('TicketHidden');
     thevalue.style.marginBottom="20px";
  }
  if(IsImageMissing){
    EmptyAvatar.classList.remove('TicketHidden');
    Info.classList.add('TicketHidden');
  }
  else{
    EmptyAvatar.classList.add('TicketHidden');
    Info.classList.remove('TicketHidden');
  }
}

//values call function.

function CallFunction(){
  ErrorAlert(FullName,NameError,IsUserName());
  ErrorAlert(EmailAddress,EmailError,isEmail());
  ErrorAlert(GitHubUsername,GitHubError,IsGitHub());
}


// function to enter user details unto the ticket.
function EnteredDetails(){
    CongratsMessage.innerHTML=`Congrats  
    <span class="GradientText">${FullName.value}!</span> 
    Your ticket is ready.`;
    
    TicketMailed.innerHTML=`we've emailed your ticket to 
    <span class="TextStyling">${EmailAddress.value}</span>
     and will send updates in the run up to the event.`;

    TicketImage.src=`${ProfilePicture}`;
    UsernameTicket.textContent=`${FullName.value}`;

    GitHubTicket.textContent=`${GitHubUsername.value}`;
    TicketNumber.textContent=`${Tickets[Math.floor(Math.random(Tickets.length)*10)]}`;
}

// the ticket show function.
function TicketSwitch(){
  if(IsUserName() && isEmail() &&IsGitHub() && !IsImageMissing){
    TheForm.classList.add('TicketHidden');
    TheTicket.classList.remove('TicketHidden');
    EnteredDetails();
  }
  else{
    TheForm.classList.remove('TicketHidden');
    TheTicket.classList.add('TicketHidden');
  }
}

// submit button functionality.
 function SubmitButton(){
      CallFunction();
      TicketSwitch();
 }





// Global variables to store the image path and upload status
let ProfilePicture = "";  // Will store the image path (data URL)
let IsImageMissing = true; // Indicates whether an image is missing

// Maximum file size in bytes (500 KB)
const MaxFileSize = 500 * 1024;

// Triggering file input when clicked
UploadTrigger.addEventListener('click', () => FileInput.click());
ImageContainer.addEventListener('click', () => FileInput.click());

// Handle file selection
FileInput.addEventListener('change', (event) => {
    handleFiles(event.target.files);
});

// Remove image handler
RemoveImage.addEventListener('click', () => {
    ThePicture.src = "assets/images/icon-upload.svg";  // Reset the image to default icon
    ThePicture.classList.remove('ThePictures');
    ImageButtons.classList.add('TicketHidden');
    ProfilePicture = "";   // Clear the stored image path
    IsImageMissing = true; // Set the flag to indicate no image is uploaded
    FileInput.value = ""; 
});

// Change image handler
ChangeImage.addEventListener('click', () => {
    FileInput.click(); // Trigger the file input dialog for new selection
});

// Handle drag-and-drop
DropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    DropArea.style.borderColor = 'blue';
});

DropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
});

// Function to handle selected files
function handleFiles(files) {
    for (const file of files) {
        if (file.size > MaxFileSize) {
            LargeAvatar.classList.remove('TicketHidden');
            Info.classList.add('TicketHidden');
            return;
        }

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                ThePicture.src = e.target.result;            // Display the uploaded image
                ThePicture.classList.add('ThePictures');     // Add styling class
                ImageButtons.classList.remove('TicketHidden'); // Show image-related buttons
                
                ProfilePicture = e.target.result; // Store the image path in the global variable
                IsImageMissing = false;           // Image is uploaded, set flag to false
            };
            reader.readAsDataURL(file);
        } else {
            InvalidAvatar.classList.remove('TicketHidden');
            Info.classList.add('TicketHidden');
        }
    }
}
