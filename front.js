
$(function () {


    let id;
    
    let videoElem = document.getElementById("video");
    let canvas = document.getElementById("canvas");
    
    let context = canvas.getContext("2d");

    let se = new Audio("SE.mp3");
    
    
    function getQrsText() {
    
    
    
    
        context.drawImage(videoElem, 0, 0);
    
        let image = context.getImageData(0, 0, canvas.width, canvas.height);
    
        let textObj = jsQR(image.data, canvas.width, canvas.height);
    
        if (textObj) {
    
            $("#out").text(textObj.data);
            console.log(textObj);
    
    
            clearInterval(id);

            se.play();

            }
    
        }
    
    //onload script
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: canvas.width,
            height: canvas.height
        }
    })
    
    .then((video) => {
    
        // async start ?
    
        videoElem.srcObject = video;
        videoElem.play();
        console.log(video);
    
        //async end ?
    
    
        
        id = setInterval(() => getQrsText(), 500);
    
    
       
    
    
    })
    
     .catch((e) => {
        console.log(e);
    
    });
    
        
    
    
    }
    );