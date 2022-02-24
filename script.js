$(document).ready(function(){
    //Get today's date and append it to the <p> element
    const todaysDate= moment().format('dddd MMMM Do YYYY, h:mm');
    $("#currentDay").text(todaysDate)
//Create grid elements
    let row= "";

    for(let i = 8; i<=18; i++){
        row= $(`<div class ="row"></div>`);
        col1 = $(`<div class ="col-lg-2 hour">${amOrPm(i)}</div>`)

        col2 = $(`<div class ="col-lg-8 inputcontent"><input data-input="${i}" id="inputText${i}" class="form-control inputText" type="text" name="userInput"></div>`)

        col3 = $(`<div class ="col-lg-2"><button data-id="${i}" id="savePlanner" class="btn btn-primary btn-block"><i class="fas fa-save"></i> Save</button></div>`)
        row.append(col1);
        row.append(col2);
        row.append(col3);
        $("#display-planner").append(row);
        getlocalStorage(i)
    }
    //Eventlistener on save button to store user input
    $("button.btn.btn-primary").click(function(e){
        const id = $(this).data("id");
        const inputText= $(this).parent().siblings().find("input").val();
        localStorage.setItems(id,inputText);
    })
//Function for telling the time of day
    function amOrPm(hour){
        let timeOfDay= "";
        if(hour<=12){
            timeOfDay = "AM";
        }else{
            timeOfDay = "PM";
        }
        hour= hour % 12;
        hour = hour ? hour : 12;
        return hour + " " + timeOfDay;
    }
});

//function for local storage
function getlocalStorage(hour){
    let inputval = localStorage.getItem(hour);
    if(true){
        const text = $(`input#inputText${hour}`).val(inputval);
        console.log(text);
    }
};

//Updating color for current time of days

function updateColor(){
    const hour = new Date().getHours();
    for(let i= 8; i<=18; i++){
        if(hour== i){
            $(`#inputText${i}`).css("background", "red");
        }else if(hour<i){
            $(`#inputText${i}`).css("background", "green");
        }
    }
}
setInterval(function(){
    updateColor()
},1000);
