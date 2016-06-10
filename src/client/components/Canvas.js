import React from 'react';
import paper, { Path, PaperScope, Color, Point} from 'paper';
import Pallete from './Pallete';
import { throttle } from 'underscore';
import io from 'socket.io-client';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.connection = io.connect();
    this.path = null;
    this.isMouseDown = false;
    var updateP = throttle((this.updatePath).bind(this), 25);
    this.connection.on('connect', ((sock) => {
      console.log('connected!');
      this.connection.on('updatePath', (point) => {
        updateP({
          point: new Point(point.x, point.y),
          color: point.color,
        });
      })
    }).bind(this));

    this.changeColor = this.changeColor.bind(this);
  }

  emitPath(e) {
    this.connection.emit('updatePath', { x: e.point.x, y: e.point.y, color: this.stroke.color});
  }

  updatePath(point) {
    const incomingColor = point.color;
    console.log(incomingColor);
    const originalColor = this.stroke.color;
    this.path.strokeColor = incomingColor;
    this.path.add(point.point);
    // this.path.strokeColor = originalColor;
  }

  componentDidMount() {
    var myCanvas = document.getElementById('myCanvas');
    // myCanvas.width = 900;
    // myCanvas.height = 400;
    paper.setup(myCanvas);
    this.path = new Path();

    paper.project.view.onMouseDown = ((e) => {
      this.isMouseDown = true;
      this.emitPath(e);
    }).bind(this);

    paper.project.view.onMouseUp = ((e) => {
      this.isMouseDown = false;
      this.path = new Path();
    }).bind(this);

    paper.project.view.onMouseMove = ((e) => {
      if(this.isMouseDown) {
        this.emitPath(e);
      }
    }).bind(this);

    paper.view.draw();
  }

  changeColor(color) {
    this.path = new Path();
    this.stroke.color = color;
    this.stroke.width = color === 'white' ? '50' : '3';
    this.path.strokeColor = this.stroke.color;
    this.path.strokeWidth = this.stroke.width;
  }

  render() {
    return (
      <div>
        <div>
          <Pallete changeColor={this.changeColor} />
        </div>
        <div><canvas className='card' id='myCanvas' resize='true'></canvas></div>
      </div>
    )
  }

}
