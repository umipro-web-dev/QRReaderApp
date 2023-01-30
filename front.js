const { QrScanner } = require("qr-scanner");
const $ = require("jquery");

$(function () {

    $("#a").fadeIn().html("<em>Hello jquery!</em>");

    var videoElem = $("#video");

    $("#startButton").on("click", () => {

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })
        
        .then((video) => {
            videoElem[0].srcObject = video;
            videoElem[0].play();

            var qrReader = new QrScanner(
                videoElem[0],
                result => {
                    console.log(result);
                    qrReader.stop();
                }
            );

            qrReader.start();

        })

        .catch((e) => {
            console.log(e);

        });
        
    });

    
});