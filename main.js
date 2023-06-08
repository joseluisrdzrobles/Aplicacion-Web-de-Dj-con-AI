var video = ""

var poseNet = ""

var rightWristy = 0
var leftWristy = 0

var song1 = "" 
var song2 = ""

var rightScore = 0
var leftScore = 0

function setup() {
    canvas = createCanvas(1125, 625)
    
    video = createCapture(VIDEO)
    video.size(1125, 625)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", getResults)
}

function modelLoaded() {
    console.log("La funcion poseNet esta listo")
}

function getResults(results) {
    if (results && results.length > 0) {
        console.log(results)

        rightWristy = results[0].pose.rightWrist.y;
        leftWristy = results[0].pose.leftWrist.y;

        rightScore = results[0].pose.keypoints[10].score;
        leftScore = results[0].pose.keypoints[9].score;
    }
}

function preload() {
    song1 = loadSound("BotW.mp3")
    song2 = loadSound("LW.mp3")
}

function draw() {
    image(video, 0, 0, 1125, 625)

    if (rightScore > 0.2 && rightWristy < 350 && !song1.isPlaying()) {
        song2.stop()
        song1.play()
        song1.setVolume(0.1)
        document.getElementById("button").innerText = "Breath of the Wild"
    }

    if (leftScore > 0.2 && leftWristy < 350 && !song2.isPlaying()) {
        song1.stop()
        song2.play()
        song2.setVolume(0.1)
        document.getElementById("button").innerText = "Lost Woods"
    }
    
}