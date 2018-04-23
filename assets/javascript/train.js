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

// Declaring initial variables
var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = 0;


// eventListener --> on click "#submitButton"
$('#submitButton').on('click', function(){
    // prevent the submit button from submitting the form
    // Don't refresh the page!
    event.preventDefault();
    // logic for storing and retrieving the recent data
    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    trainTime = $('#trainTime').val().trim();
    frequency = $('#frequency').val().trim();
    // Code for the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        // add key value --> Timestamp
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher + initial loader --> .on('value')
database.ref().on('value', function(snapshot) {
    // console.log everything from snapshot
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);


    // Handle errors
},  function(errorObject){
        console.log("Errors handled: " + errorObject.code);
});    

    //Change the HTML
    $('trainName').text(snapshot.val().trainName);
    $('destination').text(snapshot.val().destination);
    $('trainTime').text(snapshot.val().trainTime);
    $('frequency').text(snapshot.val().frequency);
