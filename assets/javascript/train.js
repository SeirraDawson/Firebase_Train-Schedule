//Initalize Firebase
var config = {
    apiKey: "AIzaSyAvXO1h4rRRAyUNC5IQeeVSTvgS7UYWq08",
    authDomain: "fir-hw-c4e45.firebaseapp.com",
    databaseURL: "https://fir-hw-c4e45.firebaseio.com",
    projectId: "fir-hw-c4e45",
    storageBucket: "fir-hw-c4e45.appspot.com",
    messagingSenderId: "534712906939"
};
firebase.initializeApp(config);

// variable that references the database
var database = firebase.database();

// eventListener --> on click "#submitButton"
// Get input data from the form
$('#submitButton').on('click', function(){
    // prevent the submit button from submitting the form
    // Don't refresh the page!
    event.preventDefault();
    //retrieving inputs from HTML
    var trainName = $('#trainNameIndex').val().trim();
    console.log("Train name is: " + trainName);
    var trainDestination = $('#destinationIndex').val().trim();
    console.log("Train destination is: " + trainDestination);
    // Moment.js HH:mm -> //////ISSUE///////
    var firstTrain = moment($('#firstTrainIndex').val().trim(), "HH:mm").format("HH:mm");
    console.log("First's train time is: " + firstTrain);
    var trainFrequency = $('#frequencyIndex').val().trim();
    console.log("Train frequency is: " + trainFrequency);

    // local "temporary" object for holding new train information
    var newTrain = {
        train: trainName,
        trainDest: trainDestination,
        trainArriving: firstTrain,
        trainFreq: trainFrequency
    };

    // loads newTrain data to firebase
    database.ref().push(newTrain);
        //.push -> adds to information already in firebase
        // .set -> overwrites pre-existing info

        console.log("Temp object " + newTrain.train);
        console.log("Temp object " + newTrain.trainDest);
        console.log("Temp object " + newTrain.trainArriving);
        console.log("Temp object " + newTrain.trainFreq);

        //clears text boxes
        $("trainNameIndex").val("");
        $("destinationIndex").val("");
        $("firstTrainIndex").val("");
        $("frequencyIndex").val("");

        // Stops executing of function and make this function return value passed
            // (false in this case). This function is "submit" event callback.
            // If this callback returns false, the form will not be submitted actually.
        return false;
    });

    // The function runs when a new train is added
    database.ref().on('child_added', function(childSnapshot, prevChildKey) {
        // console.log everything from childSnapshot
        console.log("New train " + childSnapshot.val());
        //store everything in the firebase
        var trainName = childSnapshot.val().train;
        var trainDestination = childSnapshot.val().trainDest;
        var firstTrain = childSnapshot.val().trainArriving;
        var trainFrequency = childSnapshot.val().trainFreq;

        //Train information
        console.log("Added train name: " + trainName);
        console.log("Added destination: " +trainDestination);
        /////////   NOT console.log correctly ////////////
        console.log("Added first train: " +firstTrain);
        console.log("Added frequency: " +trainFrequency);

        // moment.js current time in international time
        var timeRightNow = moment();
        console.log("Current time is: " + moment(timeRightNow).format("HH:mm"));
        // first train time neater
        var trainTime = moment(firstTrain, "HH:mm").format("hh:mm");
        console.log("trainTime: " + trainTime);
        // difference between the times
        var differTime = timeRightNow.diff(moment(trainTime, "hh:mm"),"minutes");
        console.log("Difference between the time: " + differTime);
        var remainder = differTime % trainFrequency;
        // minutes away
        var minutesAway =  trainFrequency - remainder;
        console.log("Minutes away: " + minutesAway);
        // next train
        var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
        console.log("The next train: " + nextTrain);

        //display each train information in the HTML table
        $("#trainTable").append(
            "<tr>" +
            "<td>" + trainName + "</td>"+
            "<td>" + trainDestination + "</td>" +
            "<td>" + trainFrequency + "</td>" +
            "<td>" + nextTrain + "</td>" +
            "<td>" + minutesAway + "</td>" +
            "</tr>"
        );

    });
