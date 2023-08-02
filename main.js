song1="" ;
song2="" ;
song1_estatus="";
song2_estatus="";

manoizquierdaX= 0 ;
manoizquierdaY=0;
manoderechaX= 0 ;
manoderechaY=0;
scoremanoizquierda=0;
scoremanoderecha=0;


function setup ()
{
 canvas=createCanvas(600 ,500);
 canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modeLoaded);
poseNet.on ('pose' , gotPoses);
}

function modeLoaded()
{
    console.log('PoseNet se esta inicializado')
}

function draw()
{
    image(video ,0 ,0 ,600 ,500)
    fill ("#D791EF");
    stroke ("#FF03E0");
    song1_estatus=song1.isPlaying();
    song2_estatus=song2.isPlaying();


    if(scoremanoizquierda > 0.2)
    {
    circle (manoizquierdaX , manoizquierdaY , 20);
    song2.stop();
    
    if(song1_estatus == false)
    {
      song1.play();
      document.getElementById("song1").innerHTML ="reproduciendo loba" ;
    }
  
    
    }

    if(scoremanoderecha > 0.2)
    {
      circle (manoderechaX , manoderechaY , 20);
      song1.stop();
    
      if(song2_estatus == false)
      {
        song2.play();
        document.getElementById("song2").innerHTML ="reproduciendo Harry Potter" ;
      }
      
    }
}

function preload()
{
    song1=loadSound("ytm.mp3")
    song2=loadSound("music.mp3")
}

function play()
{
song.play();
song.setVolume(0.3);
song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log (results);

        scoremanoizquierda=results[0].pose.keypoints[9].score;
        console.log("score mano izquierda:" + scoremanoizquierda);

        scoremanoderecha=results[0].pose.keypoints[10].score;
        console.log("score mano derecha:" + scoremanoderecha)
        
        manoizquierdaX = results[0].pose.leftWrist.x;
        manoizquierdaY = results[0].pose.leftWrist.y;
        console.log("muñeca izquierda X="+ manoizquierdaX +"muñeca izquierda Y=" + manoizquierdaY);

        manoderechaX = results[0].pose.rightWrist.x;
        manoderechaY = results[0].pose.rightWrist.y;
        console.log("muñeca derecha X="+ manoderechaX +"muñeca derecha Y=" + manoderechaY);



    }

}