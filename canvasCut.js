        var canvasFrame;
		var ctxCanvasFrame;
		var image2=new Image();
		var isMouseDown = false;
		var cw = 0;		var ch = 0;
        var recPosCanvasFrame;
		// Puck Dimensions (and Half thereof)
		var pw = 26;	var ph = 26;
		// Puck Position
		var px = 0;	var py = 0;
		// cursor offset relative to the puck
		var cx2 = 0;		var cy2 = 0;
        var canvasAtlas = document.getElementById("canvasAtlas");
        ctxAtlas = canvasAtlas.getContext("2d");

        var vframes=1;
        var hframes=1;
        var widthFrame=50;
        var heightframe=100;
        var iframe=0;
        var jframe=0;

        var countFrames=0;
			
	
		function Init(){
			canvasFrame = document.getElementById("canvasFrame");
			ctxCanvasFrame = canvasFrame.getContext("2d");
          

			cw = canvasFrame.width;
			ch = canvasFrame.height;
		
			canvasFrame.onmouseup = MouseUp;
			canvasFrame.onmousedown = MouseDown;
			canvasFrame.onmousemove = MouseMoved;
			return setInterval(Repaint, 10); // repaint the canvas at intervals
		}

		function Repaint(){
			ctxCanvasFrame.clearRect(0, 0, cw, ch);
            var imgData = cictx.getImageData(0, 0, canvasCutImage.width,  canvasCutImage.height);
			pw=imgData.width;	ph=imgData.height;
            ctxCanvasFrame.putImageData(imgData, px, py);       
		}

		function MouseMoved(e){	
			if ( IsCursorOverPuck(e.pageX, e.pageY) ){
                document.body.style.cursor = 'pointer';
            }
			else{	document.body.style.cursor = 'default';}
			if (isMouseDown){
				px = (e.pageX - canvasFrame.offsetLeft) - cx2;
				py = (e.pageY - canvasFrame.offsetTop)- cy2;
			}
		}

		function MouseUp(){isMouseDown = false;}

		function MouseDown(e){
			if ( IsCursorOverPuck(e.pageX, e.pageY) ){
				cx2 = (e.pageX - canvasFrame.offsetLeft) - px;
				cy2 = (e.pageY - canvasFrame.offsetTop) - py;
				isMouseDown = true;
			}
		}

		function IsCursorOverPuck(x, y){
            recPosCanvasFrame= document.getElementById("canvasFrame").getBoundingClientRect();
            let cl=recPosCanvasFrame.left + window.scrollX;
            let ct=recPosCanvasFrame.top + window.scrollY;
			return (x - cl)> px  &&  (x - cl)< px + pw
				&& (y - ct) > py   &&  (y - ct) < py + ph;
		}

        function setSizeCanvasFrame(){       
            widthFrame=document.getElementById("inpWcf").value;
            heightframe=document.getElementById("inpHcf").value;
            canvasFrame.width=widthFrame;   canvasFrame.height=heightframe;
            ctxAtlas.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
            //cw=w;ch=h;
        }

        function setVHframes(){
            vframes=document.getElementById("inpVf").value;
            hframes=document.getElementById("inpHf").value;

            canvasAtlas.width=widthFrame*vframes;
            canvasAtlas.height=heightframe*hframes;
            countFrames=0;

            iframe=0; jframe=0;

            document.getElementById("lbCountFrame").innerHTML = "Frame:"+countFrames;
            document.getElementById('lbCountFrame').style.color = "white";
        }

        function addFrame(){
            //ctxAtlas.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
            var imgData = ctxCanvasFrame.getImageData(0, 0, canvasFrame.width,  canvasFrame.height);
            countFrames=countFrames+1;
            if(countFrames<=vframes*hframes){
                document.getElementById("lbCountFrame").innerHTML = "Frame:"+countFrames;
                if(iframe<vframes){
                    ctxAtlas.putImageData(imgData, iframe*widthFrame,jframe*heightframe);
                    iframe=iframe+1;
                }else{
                    iframe=0;
                    jframe=jframe+1;
                    ctxAtlas.putImageData(imgData, iframe*widthFrame,jframe*heightframe);
                    iframe=iframe+1;;            
                }   
            }else{
                document.getElementById("lbCountFrame").innerHTML = "Frame:"+(countFrames-1)+"  STOP!! Add more frames";
                document.getElementById('lbCountFrame').style.color = "red";
            }
           
        }


		Init();