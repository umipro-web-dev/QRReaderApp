 
$(function () {


    let id;
    
    let videoElem = document.getElementById("video");
    let canvas = document.getElementById("canvas");
    
    let context = canvas.getContext("2d");

    let se = new Audio("SE.mp3");

    $(".loading").hide();
    $(".result").hide();
    
    
    async function getQrsText() {
    
    
    
    
        context.drawImage(videoElem, 0, 0);
    
        let image = context.getImageData(0, 0, canvas.width, canvas.height);
    
        let textObj = jsQR(image.data, canvas.width, canvas.height);
    
        if (textObj) {

            clearInterval(id);

            $("body").css("background-color", "#50C6FA");
            $(".loading").show(); 
            $("main").hide();



            const res_from_render = await fetch("https://enter-room.onrender.com/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    data: textObj.data
                }),
                mode: "cors"
            });

            if (!res_from_render.ok) {
                $(".loading").hide();
                $(".result").show();
                $("body").css("background-color", "#FF311C");
                $(".result .message").text("無効なQRコードです。");
                return;
            }

            const res_html = await res_from_render.text();

            $(".loading").hide();

            document.write(res_html);

            se.play();

            setTimeout(() => {
                window.location.reload();
            }, 5000)

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
    
    
        
        id = setInterval(() => getQrsText(), 1000);
    
    
       
    
    
    })
    
     .catch((e) => {
        console.log(e);
    
    });
    
        
    
    
    }
    );
