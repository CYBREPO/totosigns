import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { Icons, shapes } from 'src/app/constants/constants';
import { IGraphic, ITextData } from 'src/app/interface/Isignmaker';
import { fabric } from 'fabric';
import { Path } from 'fabric/fabric-impl';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
// import 'fabric-customise-controls';
import * as _ from 'lodash';
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent {

  c: any;
  ctx: CanvasRenderingContext2D;
  mouse: { x: number, y: number } = { x: 0, y: 0 };
  txtWidth: number;
  enableDraw: boolean;
  // data: Array<ITextData> = [];
  data: Array<{ type: string, obj: ITextData }> = [];
  // data: Array<{ type: string, obj: { version: string; objects: fabric.Object[]; } }> = [];
  rectOX: number;
  rectOY: number;
  click: boolean = false;
  canvas: fabric.Canvas;
  @ViewChild('workArea') workArea: ElementRef<any>;
  upperCanvas: fabric.Canvas;
  // currentObjects: { type: string, obj: { version: string; objects: fabric.Object[]; } } | undefined;
  currentObjects: { type: string, obj: ITextData } | undefined;
  width: number = 0;
  height: number = 0;

  constructor(private renderer: Renderer2, private host: ElementRef, private dialog: MatDialog) { }

  ngOnInit() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = new fabric.Canvas("exampleCanvas", {
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.upperCanvas = new fabric.Canvas("upperCanvas", {
      width: this.width,
      height: this.height,
      preserveObjectStacking: true,
      imageSmoothingEnabled: false,
      enableRetinaScaling: false,
    });

    this.setBackgroundImage(this.canvas);

    // this.dialog.open(PopupComponent,{
    //   maxWidth: '100vw',
    //   maxHeight: '100vh',
    //   height: '100%',
    //   width: '100%',
    //   panelClass: 'full-screen-modal',
    //   data: this.data,
    // })


  }


  inputChange(data: ITextData) {
    let x = window.innerWidth / 2, y = 75;
    if (this.data?.length > 0) {
      //find x & y co-ordinates
      // x = 0; y = 0;
      // this.data.forEach(m => {
      //   x = x < (m.objects.aCoords?.bl.x ?? 0) ? m.objects[0].aCoords?.bl.x ?? 0 : x;
      //   y = y < (m.objects[0].aCoords?.bl.y ?? 0) ? m.objects[0].aCoords?.bl.y ?? 0 : y;
      // });
    }

    data.x = x;
    data.y = y;
    if (data.completed) {
      this.upperCanvas.setDimensions({ width: 0, height: 0 });
      this.upperCanvas.requestRenderAll();
      if (this.currentObjects)
        this.data.push(this.currentObjects);
      // this.data.push(data);
      this.canvasDraw();
    }
    else if (data?.shapes) {
      this.upperCanvas.setDimensions({ width: this.width, height: this.height });

      data.opacity = 0.1;
      this.setBackgroundImage(this.canvas, data.opacity);
      this.setObjectsOpacity(this.canvas, data.opacity);
      this.drawShapes(this.upperCanvas, data);

    }
    else {
      this.upperCanvas.setDimensions({ width: this.width, height: this.height });
      data.opacity = 1;
      data.x = 0;
      data.y = 0;
      this.setObjectsOpacity(this.canvas, data.opacity);
      this.draw(this.upperCanvas, data);

      // this.setBackgroundImage(this.canvas);
    }
    // this.draw(data);
    // this.canvas.calcOffset()
  }

  setObjectsOpacity(canvas: fabric.Canvas, opacity: number) {
    canvas.getObjects().forEach(m => {
      m.opacity = opacity;
    });

  }

  canvasDraw() {

    this.clearCanvas(this.canvas);
    // this.canvas.loadFromJSON(this.data);
    let dt: Object[] = [];
    let obj2 = _.cloneDeep(this.data);
    // let newdata:Array<{ type: string, obj: { version: string; objects: fabric.Object[]; } }> = JSON.parse(JSON.stringify(this.data));
    obj2.forEach(m => {
      if (m.type == "Shape") {
        //   // var group = new fabric.Group([...m.obj.objects]);
        //   // m.obj.objects.forEach(x => {

        //   // })
        //   // group.add([...m.obj.objects])
        //   // let newGp: Array< fabric.Object> = [];
        //   let clipArray:  Array< fabric.Object> = [];
        //   let clipPath = m.obj.objects.find(x => x.name == "shapeFace");
        //   m.obj.objects.forEach(x => {
        //     // x.selectable = true; x.evented = true;
        //       // x.absolutePositioned= false;
        //     if (x.name == "clipped") {
        //       // if(false){
        //       //   // clipPath.clone(function (cloned: fabric.Object) {
        //       //   //   // cloned.left = cloned.left ?? 0 + 10;
        //       //   //   // cloned.top = cloned.top ?? 0 + 10;
        //       //   //   // temp = cloned
        //       //   //   x.clipPath = cloned;
        //       //   // });
        //       // }
        //       // else{
        //       //   // x.left = clipPath?.left
        //       //   // x.top = clipPath?.top
        //       // x.clipPath = clipPath
        //       // // clipArray.push(x);
        //       // }

        //       x.clipPath = clipPath
        //     }
        //     else{

        //       // newGp.push(x);
        //     }

        //     // gp.addWithUpdate(x);
        //   });
        //   var gp = new fabric.Group([...m.obj.objects]);
        //   // var gp = new fabric.Group([...newGp]);
        //   // clipArray.forEach(m => m.clipPath = gp);
        //   // gp.add(...clipArray);
        //   this.canvas.add(gp);
        //   // this.canvas.add(...clipArray);
        //     // temp.forEach(m => m.visible == true);
        //   // dt.push(...m.obj.objects);

        //   // Get all the objects as selection
        //   //   var sel = new fabric.ActiveSelection(m.obj.objects, { 
        //   //     canvas: this.canvas,
        //   //  });

        //   // Make the objects active
        //   //  this.canvas.setActiveObject(sel);

        //   // Group the objects
        //   //  sel.toGroup();
        //   // var pathArray: Array<fabric.Path> = [];
        //   // temp.forEach(x => {
        //   //   pathArray.push(x as fabric.Path);
        //   // })
        //   // let gp = new fabric.Group();

        //   // //Forming group
        //   // // gp.addWithUpdate(temp[0]);
        //   // let group = new fabric.Group(temp, {
        //   //   useSetOnGroup: false,
        //   //   borderDashArray: [7, 7],
        //   //   borderColor: "black",
        //   //   // hasControls: true,
        //   // });

        //   // // dt.push(group);
        //   // var image =  m.obj.objects.find(m => m.type == "image");
        //   // if(image != undefined){
        //   //   image.selectable = false;
        //   //   dt.push(image);
        //   // }
        // }
        // else {
        //   dt.push(...m.obj.objects);
        // }
        dt.push(m.obj);
        this.drawShapes1(this.canvas, m.obj)

        // if (m?.shapes) {
        //   m.selectable = true;
        //   this.drawShapes1(this.canvas, m);
      }
      else { this.draw(this.canvas, m.obj); }

    });

    // if (dt != null && dt != undefined && dt.length > 0) {
    //   let tp: { version: string; objects: Object[]; } = {
    //     version: this.data[0].obj.version,
    //     objects: dt
    //   }

    // this.canvas.loadFromJSON(dt[0], this.canvas.renderAll.bind(this.canvas), function (o: any, obj: any) {
    //   debugger
    //   console.log(obj);
    //   // this.canvas.sendToBack(o, obj);
    //   // canvas.sendToBack(o[0]);
    // });
    // dt.forEach(m => {
    //   let gp = new fabric.Group();
    //   this.canvas.add(gp);
    //   let _this = this;
    //   this.canvas.loadFromJSON(m, this.canvas.renderAll.bind(this.canvas), function (o: any, object: fabric.Object) {
    //     // fabric.log(o, object);
    //     // object.selectable
    //     // gp.addWithUpdate(object);
    //     // gp.setCoords();
    //     // _this.canvas.requestRenderAll();
    //   });
    //   this.canvas.getObjects().forEach(m => { debugger });
    // })


    // }

    this.setBackgroundImage(this.canvas);

    // this.dialog.open(PopupComponent, {
    //   maxWidth: '100vw',
    //   maxHeight: '100vh',
    //   height: '100%',
    //   width: '100%',
    //   panelClass: 'full-screen-modal',
    //   data: this.data,
    // })
  }

  setBackgroundImage(canvas: fabric.Canvas, opacity: number = 1) {
    canvas.setBackgroundImage("../assets/images/banner.png", this.canvas.renderAll.bind(this.canvas), {
      // backgroundImageOpacity: 1,
      originX: "left",
      originY: "top",
      scaleX: 0.3,
      scaleY: 0.3,
      opacity: opacity
    });
  }

  clearCanvas(canvas: fabric.Canvas) {
    canvas.getObjects().forEach(element => {
      if (element !== this.canvas.backgroundImage) {
        canvas.remove(element);
      }
    });
    canvas.off("mouse:down");
  }

  setOpacity(canvas: fabric.Canvas, opacity: number = 1) {
    canvas.getObjects().forEach(m => m.opacity = opacity);
  }

  setSelectable(canvas: fabric.Canvas, selected: boolean) {
    canvas.getObjects().forEach(m => m.selectable = selected);
  }

  draw(canvas: fabric.Canvas, data: ITextData | null) {
    if (!data?.completed)
      this.clearCanvas(canvas);

    if (data != null && data.value != '') {
      let centreX = data.x != null && data.x != undefined ? data.x : window.innerWidth / 2;
      let centreY = data.y != null && data.y != undefined ? data.y : 75;
      // let _this = this;
      // let temp: fabric.Object;
      // temp.
      let text: fabric.Text;
      let textGroups: Array<fabric.Text> = [];


      //Text Trim
      for (let i = 0; i < 7; i++) {

        text = new fabric.Text(data.value, {
          fill: data.sideColor ?? "Black",
          fontSize: Number(data.size) ?? 100,
          left: centreX + i,
          top: centreY + i,
          fontFamily: data.font,
          fontWeight: 'bold',
        });
        textGroups.push(text);
      }
      //Text boarder/storke
      for (let i = 0; i < 3; i++) {
        text = new fabric.Text(data.value, {
          fill: data.boarderColor ?? "Black",
          fontSize: Number(data.size) ?? 100,
          left: centreX + i,
          top: centreY + i,
          fontFamily: data.font,
          fontWeight: 'bold',
        });
        textGroups.push(text);
      }

      // Text Face
      text = new fabric.Text(data.value, {
        fill: data.color ?? "green",
        fontSize: Number(data.size) ?? 100,
        left: centreX,
        top: centreY,
        fontFamily: data.font,
        fontWeight: 'bold',
        shadow: data.product.title.toLowerCase().includes("halo") ? new fabric.Shadow({
          color: data.shadowColor ?? "orange",
          blur: 25
          // offsetX: res,
          // offsetY: res,
        }) : undefined,
      });

      if (data.faceImage != undefined && data.faceImage != '') {
        fabric.util.loadImage(data.faceImage, function (img) {
          text.set('fill', new fabric.Pattern({
            source: img,
            repeat: 'repeat'
          }))
        });
      }
      // else {
      //   text.set('fill',data.color ?? "green");
      // }

      textGroups.push(text);

      this.txtWidth = text.getScaledWidth();
      // Displaying Race
      let rectX = centreX - 10;
      let rectY = centreY;
      let rectangleList: Array<fabric.Rect> = [];
      if (data.product.title.toLowerCase().includes("raceway")) {
        for (let i = 1; i <= 3; i++) {
          let rect = new fabric.Rect({
            width: this.txtWidth + 32,
            height: 20,
            fill: 'black',
            left: rectX + i,
            top: ((Number(data.size) - 20) / 2) + rectY + i,
          });
          rectangleList.push(rect);
        }

        let rect = new fabric.Rect({
          width: this.txtWidth + 32,
          height: 20,
          fill: data.raceColor ?? "pink",
          left: rectX,
          top: (Number(data.size) - 20) / 2 + rectY,
        });
        rectangleList.push(rect);
      }

      //Forming group
      let group = new fabric.Group([...rectangleList, ...textGroups], {
        useSetOnGroup: false,
        borderDashArray: [7, 7],
        borderColor: "black",
        // hasControls: true,
      });


      fabric.Object.prototype.controls['deleteControl'] = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 0,
        cursorStyle: 'pointer',
        mouseUpHandler: this.deleteObject(this),
        render: this.renderIcon(Icons.deleteIcon),
        // cornerSize: 24
      });


      //Disabling corners
      fabric.Object.prototype.setControlsVisibility({
        'ml': false, 'tl': false, 'tr': false,
        'mr': false, 'mtr': false, 'mb': false, 'bl': false, 'mt': false
      })

      // Render the Text on Canvas
      canvas.add(group);
      if (!data.completed) {
        this.setOpacity(canvas, data.opacity);
      }
      else {
        this.setBackgroundImage(canvas);
      }

      this.setSelectable(canvas, data?.completed ?? false);

      this.currentObjects = { type: "Text", obj: data };
    }

  }

  deleteObject(_this: any) {

    return function (eventData: MouseEvent, transform: fabric.Transform, x: number, y: number) {
      var target = transform.target;
      var canvas = target.canvas;
      // var stage = target.canvas?.toSVG()??"";
      canvas?.remove(target);
      canvas?.requestRenderAll();
      _this.progressBar(target);
      return true;
    }
  }

  cloneObject(eventData: MouseEvent, transform: fabric.Transform) {
    var target = transform.target;
    var canvas = target.canvas;
    target.clone(function (cloned: fabric.Object) {
      cloned.left = cloned.left ?? 0 + 10;
      cloned.top = cloned.top ?? 0 + 10;
      canvas?.add(cloned);
    });
  }

  progressBar(target: fabric.Object) {
    let timerLeft = 0;
    let interval = setInterval(() => {
      if (timerLeft - 2000 / 1000 <= 0) {
        timerLeft = 0;
        clearInterval(interval);
      } else {
        timerLeft -= 2000 / 1000;

      }
      this.workArea.nativeElement
        .insertAdjacentHTML('beforeend', '<mat-progress-bar mode="determinate" [value]="timerLeft"></mat-progress-bar>');

    }, 2000)
  }

  renderIcon(icon: string) {
    return function (ctx: any, left: any, top: any, styleOverride: any, fabricObject: any) {
      // var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
      var img = document.createElement('img');
      img.src = icon;
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  listObject(_this: any) {
    return function (eventData: MouseEvent, transform: fabric.Transform, x: number, y: number) {
      var target = transform.target;
      eventData.clientX;
      eventData.clientY;
      var canvas = target.canvas;
      _this.workArea.nativeElement
        .insertAdjacentHTML('beforeend', `<ul class="sc-bdVaJa jgLspe" style="visibility: visible; position:absolute;left: 
        ${eventData.clientX}px; top: ${eventData.clientY}px;"><li class="sc-bwzfXH haAKrB"><a (click)="stretchObject()">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows-alt" 
        class="svg-inline--fa fa-arrows-alt fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512"><path fill="currentColor" 
        d="${shapes.Stretch.backgroundPath}"></path></svg>Stretch</a></li>
        <li class="sc-bwzfXH haAKrB" (click)="stretchObject()"><a>
        <svg aria-hidden="true"  data-prefix="fas" data-icon="clone" class="svg-inline--fa fa-clone fa-w-16 " 
        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" 
        d="${shapes.Copy.backgroundPath}"></path></svg>Duplicate</a>
        </li>
        </ul>`);

      // _this.workArea.nativeElement.on({})
      return true;
    }

  }

  stretchObject() {
    fabric.Object.prototype.setControlsVisibility({
      'ml': true, 'tl': true, 'tr': true,
      'mr': true, 'mtr': true, 'mb': true, 'bl': true, 'mt': true
    })
  }

  drawShapes(shapeCanvas: fabric.Canvas, data: ITextData) {
    if (shapeCanvas) {
      // let ctx  =  shapeCanvas.getContext();
      if (!data.selectable) {
        this.clearCanvas(shapeCanvas);
        this.currentObjects = undefined;
      }


      let path = data.shapes?.path.split(" ") ?? [];
      let startCord = path[1].split(",");
      let [x, y] = startCord.map(x => Number(x));
      x = (shapeCanvas.width ?? 0) / 2 - 600;
      y = (shapeCanvas.height ?? 0) / 2 - 80;

      // path[1] = x + "," + y;
      let pathJoin = path.join(" ");
      let groupList: Array<fabric.Path> = [];

      // Shadow

      for (let i = 5; i < 12; i++) {
        // let startCord = path[1].split(",");
        // let [x, y] = startCord.map(x => Number(x));
        // x += i / 10;
        // y += i / 12;

        // path[1] = x + "," + y;
        // let pathJoin = path.join(" ");

        let shape = new fabric.Path(pathJoin, {
          name: "shadow",
          stroke: data.sideColor,

          // originY: "center",
          // originX: "center",
          left: x + i,
          top: y + i,
          selectable: data.selectable,
          evented: false,
          scaleX: 4,
          scaleY: 4,
          absolutePositioned: true,
        });

        shapeCanvas.sendBackwards(shape, true);
        groupList.push(shape);
      }

      // path = data.shapes?.path.split(" ") ?? [];
      // startCord = path[1].split(",");
      // [x, y] = startCord.map(x => Number(x));
      // x = (shapeCanvas.width ?? 0) / 2 - 600;
      // y = (shapeCanvas.height ?? 0) / 2 - 80;

      // path[1] = x + "," + y;
      // boarder/storke
      for (let i = 0; i < 6; i++) {
        // let startCord = path[1].split(",");
        // [x, y] = startCord.map(x => Number(x));
        // x -= i / 10;
        // y -= i / 12;

        // path[1] = x + "," + y;
        // let pathJoin = path.join(" ");

        let shape = new fabric.Path(pathJoin, {
          name: "boarder",
          stroke: data.boarderColor ?? "black",
          // originY: "center",
          // originX: "center",

          left: x + i,
          top: y + i,
          selectable: data.selectable,
          evented: false,
          scaleX: 4,
          scaleY: 4,
          absolutePositioned: true,
        });

        // shapeCanvas.sendToBack(shape);
        shapeCanvas.sendBackwards(shape, true);
        groupList.push(shape);
      }
      // path = data.shapes?.path.split(" ") ?? [];
      // startCord = path[1].split(",");

      // path[1] = x + "," + y;
      // pathJoin = path.join(" ");

      let shape = new fabric.Path(pathJoin, {
        name: "shapeFace",
        stroke: data.color ?? "green",
        // originY: "center",
        // originX: "center",

        left: x,
        top: y,
        fill: data.color ?? "green",
        selectable: data.selectable,
        evented: false,
        scaleX: 4,
        scaleY: 4,
        absolutePositioned: true,
      });
      shapeCanvas.sendBackwards(shape, true);

      groupList.push(shape);

      let shape1 = new fabric.Path(pathJoin, {
        name: "ShapeToClip",
        stroke: data.boarderColor ?? data.color,
        // originY: "center",
        // originX: "center",

        left: x,
        top: y,
        fill: 'rgba(0,0,0,0)',
        selectable: data.selectable,
        evented: false,
        scaleX: 4,
        scaleY: 4,
        absolutePositioned: true,

      });

      groupList.push(shape1);

      shapeCanvas.add(...groupList);
      // groupList.forEach(m => { shapeCanvas.centerObject(m);});

      data.graphics?.sort((a,b) => {return (a.stack_order??0) - (b.stack_order??0)});
      data.graphics?.forEach(grp => {
        if (grp.faceart_url) {
          var img = new Image();
          var image: fabric.Image;

          img.onload = () => {
            image = new fabric.Image(img,
              {
                name: "clipped",
                strokeDashArray: [7, 7],
                cornerStyle: 'circle',
                left: ((shapeCanvas.width ?? 0) / 2 - 600) - (grp.position_x ?? 0),
                top: ( (shapeCanvas.height ?? 0) / 2 - 80) - (grp.position_y ?? 0),
                absolutePositioned: true,
                scaleX: grp.scale_x ?? 4,
                scaleY: grp.scale_y ?? 4,
                clipPath: shape,
              });

            shapeCanvas.add(image);

            shapeCanvas.sendBackwards(image, true); //text
            this.currentObjects = { type: "Shape", obj: data };
          }
          img.src = ("https://storage.googleapis.com/signmonkey-148101.appspot.com/" + grp.faceart_url) ?? "";
        }
        else {
          let text = new fabric.Text(grp.text ?? "", {
            fill: grp.color_hex ?? "white",
            stroke: grp.stroke_color_hex ?? "black",
            fontSize: grp.font_size ?? 100,
            left: ((shapeCanvas.width ?? 0) / 2 - 600) - (grp.position_x ?? 0),
            top: ( (shapeCanvas.height ?? 0) / 2 - 80) - (grp.position_y ?? 0),
            fontFamily: grp.font_name,
            fontWeight: grp.font_style,
            clipPath: shape,
            name: "clipped",
            strokeDashArray: [7, 7],
            cornerStyle: 'circle',
          });
          shapeCanvas.add(text);
          shapeCanvas.sendBackwards(text, true);
          this.currentObjects = { type: "Shape", obj: data };
        }
      });


      // fabric.Image.prototype._render = function(ctx) {
      //   // custom clip code
      //   if (this.clipPath) {
      //     ctx.save();
      //     if (this.clipPath.fixed) {
      //       var retina = shapeCanvas.getr.getRetinaScaling();
      //       ctx.setTransform(retina, 0, 0, retina, 0, 0);
      //       // to handle zoom
      //       ctx.transform.apply(ctx, shapeCanvas.viewportTransform);
      //       //
      //       this.clipPath.transform(ctx);
      //     }
      //     this.clipPath._render(ctx);
      //     ctx.restore();
      //     ctx.clip();
      //   }

      //   // end custom clip code


      //   var x = -this.width / 2, y = -this.height / 2, elementToDraw;

      //   if (this.isMoving === false && this.resizeFilter && this._needsResize()) {
      //     this._lastScaleX = this.scaleX;
      //     this._lastScaleY = this.scaleY;
      //     this.applyResizeFilters();
      //   }
      //   elementToDraw = this._element;
      //   elementToDraw && ctx.drawImage(elementToDraw,
      //                                  0, 0, this.width, this.height,
      //                                  x, y, this.width, this.height);
      //   this._stroke(ctx);
      //   this._renderStroke(ctx);
      // };



      //Disabling corners
      fabric.Object.prototype.setControlsVisibility({
        'ml': false, 'tl': false, 'tr': false,
        'mr': false, 'mb': false, 'bl': false, 'mt': false
      });

      if (!data.selectable) {
        let prevObject: fabric.Object | undefined;
        shapeCanvas.on("mouse:down", object => {
          let objName = object.target?.name;

          if (objName == "clipped" && object.target) {
            object.target.set("clipPath", undefined);
            object.target.set("name", "Object");
            if (prevObject) {
              prevObject?.set("clipPath", shape);
              prevObject?.set("name", "clipped");
              prevObject = undefined;
            }

            prevObject = object.target;
          }
          else if (object.target == null || object.target == undefined || object.target != prevObject) {

            // if (prevObject)
            prevObject?.set("clipPath", shape);
            prevObject?.set("name", "clipped");
            prevObject = undefined;

            // canvas.requestRenderAll();
          }
          else if (object.target) {
            prevObject = object.target;
          }

          // var version = shapeCanvas.toJSON().version;
          // this.currentObjects = { type: "Shape", obj: { version: version, objects: tempShape } };
          let graphics: Array<IGraphic> = [];
          let allObjects = shapeCanvas.getObjects().filter(m => m.type != "path");
          allObjects.forEach(m => {
            graphics.push({
              faceart_url: m.get('type') == 'image' ? (m as fabric.Image).getSrc() : "",
              scale_x: m.scaleX,
              scale_y: m.scaleY,
              position_y: m.top,
              position_x: m.left,
              width: m.width,
              height: m.height,
              // text: m.,
            });
          });
          data.graphics = graphics;
          this.currentObjects = { type: "Shape", obj: data };
        });
      }

      fabric.Object.prototype.controls['deleteControl'] = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 0,
        cursorStyle: 'pointer',
        mouseUpHandler: this.deleteObject(this),
        render: this.renderIcon(Icons.deleteIcon),
        // cornerSize: 24
      });

      fabric.Object.prototype.controls['listControl'] = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: 0,
        cursorStyle: 'pointer',
        mouseUpHandler: this.listObject(this),
        render: this.renderIcon(Icons.ListIcon),
      });


      // fabric.util.object.extend(fabric.Object.prototype, {
      //   hasRotatingPoint: true,
      //   // cornerSize: 0,
      //   _drawControl: function (control:any, ctx:any, methodName:any, left:any, top:any) {
      //     if (!this.isControlVisible(control)) {
      //       return;
      //     }
      //     var size = this.cornerSize,
      //       size2 = size / 2,
      //       scaleOffsetY = size2 / this.scaleY,
      //       scaleOffsetX = size2 / this.scaleX,
      //       height = this.height,
      //       width = this.width
      //     //	left = (this.width / 2),
      //     //		top = (this.height / 2)

      //     // isVML() || this.transparentCorners || ctx.clearRect(left, top, size / this.scaleX, size / this.scaleY);

      //     if (control !== 'br')
      //       ctx['fillRect'](left, top, size / this.scaleX, size / this.scaleY);

      //     var SelectedIconImage = new Image();
      //     if (control === 'br') {
      //       SelectedIconImage.src = 'http://cdn.flaticon.com/svg/56/56433.svg';
      //       //   ctx.drawImage(SelectedIconImage, left, top, size, size);

      //       //   left = left + scaleOffsetX;
      //       //   top = top + scaleOffsetY;

      //       ctx.drawImage(SelectedIconImage, left, top, size / this.scaleX, size / this.scaleY);

      //       this.setControlsVisibility({
      //         bl: false,
      //         br: true,
      //         tl: true,
      //         tr: false,
      //         mt: false,
      //         mb: false,
      //         ml: false,
      //         mr: false,
      //         mtr: false,
      //       });

      //     }

      //   }

      // });

      // fabric.Object.prototype.controls['expend'] = new fabric.Control({
      //   x: 0.5,
      //   y: 0.5,
      //   offsetY: 0,
      //   cursorStyle: 'pointer',
      //   // actionHandler:


      //     // mouseUpHandler: this.listObject(this),
      //     render: this.renderIcon(Icons.ListIcon),
      // });

    }
  }

  drawShapes1(shapeCanvas: fabric.Canvas, data: ITextData) {
    if (shapeCanvas) {
      // let ctx  =  shapeCanvas.getContext();
      // if (!data.selectable) {
      //   this.clearCanvas(shapeCanvas);
      //   this.currentObjects = undefined;
      // }


      let path = data.shapes?.path.split(" ") ?? [];
      // let startCord = path[1].split(",");
      // let [x, y] = startCord.map(x => Number(x));
      let x = (shapeCanvas.width ?? 0) / 2 - 600;
      let y = (shapeCanvas.height ?? 0) / 2 - 80;

      // path[1] = x + "," + y;
      let pathJoin = path.join(" ");
      let groupList: Array<fabric.Path> = [];

      // Shadow

      for (let i = 5; i < 12; i++) {
        // let startCord = path[1].split(",");
        // let [x, y] = startCord.map(x => Number(x));
        // x += i / 10;
        // y += i / 12;

        // path[1] = x + "," + y;
        // let pathJoin = path.join(" ");

        let shape = new fabric.Path(pathJoin, {
          name: "shadow",
          stroke: data.sideColor,
          // originY: "center",
          // originX: "center",
          left: x + i,
          top: y + i,
          scaleX: 4,
          scaleY: 4,
          absolutePositioned: true,
        });

        // shapeCanvas.sendBackwards(shape, true);
        groupList.push(shape);
      }

      // path = data.shapes?.path.split(" ") ?? [];
      // startCord = path[1].split(",");
      // [x, y] = startCord.map(x => Number(x));
      // x = (shapeCanvas.width ?? 0) / 2 - 600;
      // y = (shapeCanvas.height ?? 0) / 2 - 80;

      // path[1] = x + "," + y;
      // boarder/storke
      for (let i = 0; i < 6; i++) {
        // let startCord = path[1].split(",");
        // [x, y] = startCord.map(x => Number(x));
        // x -= i / 10;
        // y -= i / 12;

        // path[1] = x + "," + y;
        // let pathJoin = path.join(" ");

        let shape = new fabric.Path(pathJoin, {
          name: "boarder",
          stroke: data.boarderColor ?? "black",
          // originY: "center",
          // originX: "center",
          left: x + i,
          top: y + i,
          scaleX: 4,
          scaleY: 4,
          absolutePositioned: true,
        });

        // shapeCanvas.sendToBack(shape);
        // shapeCanvas.sendBackwards(shape, true);
        groupList.push(shape);
      }
      // path = data.shapes?.path.split(" ") ?? [];
      // startCord = path[1].split(",");

      // path[1] = x + "," + y;
      // pathJoin = path.join(" ");

      let shape = new fabric.Path(pathJoin, {
        name: "shapeFace",
        stroke: data.color ?? "green",
        // originY: "center",
        // originX: "center",
        left: x,
        top: y,
        fill: data.color ?? "green",
        scaleX: 4,
        scaleY: 4,
        absolutePositioned: true,
      });
      // shapeCanvas.sendBackwards(shape, true);

      groupList.push(shape);

      let shape1 = new fabric.Path(pathJoin, {
        name: "ShapeToClip",
        stroke: data.boarderColor ?? data.color,
        // originY: "center",
        // originX: "center",
        left: x,
        top: y,
        fill: 'rgba(0,0,0,0)',
        scaleX: 4,
        scaleY: 4,
        absolutePositioned: true,

      });

      groupList.push(shape1);
      var gp = new fabric.Group(groupList)

      shapeCanvas.add(gp);

      data.graphics?.forEach(grp => {
        if (grp.faceart_url) {
          var img = new Image();
          var image: fabric.Image;

          img.onload = () => {
            image = new fabric.Image(img,
              {
                name: "clipped",
                // strokeDashArray: [7, 7],
                // cornerStyle: 'circle',
                left: grp.position_x ?? (shapeCanvas.width ?? 0) / 2 - 600,
                top: grp.position_y ?? (shapeCanvas.height ?? 0) / 2 - 80,
                absolutePositioned: true,
                scaleX: grp.scale_x,
                scaleY: grp.scale_y,
                selectable: false,
                evented: false,
                clipPath: shape,
                width: grp.width,
                height: grp.height
              });
            shapeCanvas.add(image);
            gp.addWithUpdate(image);

          }
          img.src = (grp.faceart_url.includes("https://storage.googleapis.com/") ?
            grp.faceart_url : ("https://storage.googleapis.com/signmonkey-148101.appspot.com/" + grp.faceart_url)) ?? "";
        }
        else {
          let text = new fabric.Text(grp.text ?? "", {
            fill: grp.color_hex ?? "white",
            stroke: grp.stroke_color_hex ?? "black",
            fontSize: grp.font_size ?? 100,
            left: grp.position_x ?? (shapeCanvas.width ?? 0) / 2 - 600,
            top: grp.position_y ?? (shapeCanvas.height ?? 0) / 2 - 80,
            fontFamily: grp.font_name,
            fontWeight: grp.font_style,
            clipPath: shape,
            name: "clipped",
            strokeDashArray: [7, 7],
            cornerStyle: 'circle',
          });
          shapeCanvas.add(text);
          // shapeCanvas.sendBackwards(text, true);
        }
      });

      // shapeCanvas.on("mouse:down", object => {
      //   if (object.target)
      //     object.target.opacity = 0.1;
      // });
      // shapeCanvas.on("mouse:up", object => {
      //   if (object.target)
      //     object.target.opacity = 1;
      // });


      //Disabling corners
      fabric.Object.prototype.setControlsVisibility({
        'ml': false, 'tl': false, 'tr': false,
        'mr': false, 'mb': false, 'bl': false, 'mt': false
      });

      fabric.Object.prototype.controls['deleteControl'] = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 0,
        cursorStyle: 'pointer',
        mouseUpHandler: this.deleteObject(this),
        render: this.renderIcon(Icons.deleteIcon),
        // cornerSize: 24
      });

      fabric.Object.prototype.controls['listControl'] = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: 0,
        cursorStyle: 'pointer',
        mouseUpHandler: this.listObject(this),
        render: this.renderIcon(Icons.ListIcon),
      });

    }
  }

  updateMeasures(evt: fabric.IEvent<MouseEvent>) {
    var obj = evt.target;
    // if (obj.type != 'group') {
    // return;
    // }
    var width = obj?.getScaledWidth();
    var height = obj?.getScaledHeight();
    // obj?.oCoords?.br = width.toFixed(2) + 'px';
    // obj._objects[1].scaleX= 1 / obj.scaleX;
    // obj._objects[1].scaleY= 1 / obj.scaleY;
    // obj._objects[2].text = height.toFixed(2) + 'px';
    // obj._objects[2].scaleX= 1 / obj.scaleY;
    // obj._objects[2].scaleY= 1 / obj.scaleX;
  }


  clippingImage(canvas: fabric.Canvas | undefined, img: fabric.Image, shape: fabric.Object, gp: fabric.Object) {
    let newImage;
    if (canvas) {
      if (img) {
        newImage = img;
        img.cloneAsImage(function (Img: fabric.Image) {
          Img.set({
            clipPath: shape,
            name: "clipped",
            left: img.left,
            top: img.top,
            strokeDashArray: img.strokeDashArray
          });
          canvas.add(Img);
          // if(tempShape.some(m => m.name == "clippedImage"))
          // tempShape.push(Img);
          canvas.requestRenderAll();
        });
        img.cloneAsImage(function (Img: fabric.Image) {
          Img.set({
            clipPath: gp,
            name: "clippedImage",
            left: img.left,
            top: img.top,
            selectable: false,
            // strokeDashArray: img.strokeDashArray
          });
          // gp.set('fill', new fabric.Pattern({
          //   source: image,
          //   left: img.left,
          //   top: img.top,
          //   repeat: 'no-repeat'
          // }))

          newImage = Img;
        });

      }
      // shape.set('name', 'clipped');
      shape.set('selectable', false);
      canvas.requestRenderAll();
    }

    return newImage;

  }
}
