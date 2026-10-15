# Face Direction Detection

This app works out which way your face is pointing, live from your webcam, in the browser. It uses TensorFlow.js
and MediaPipe FaceMesh to find 468 points on your face. Then it uses the points around your nose to measure how
far your head is turned left or right and tilted up or down.

The code comes from [sshadmand/face-direction-detection](https://github.com/sshadmand/face-direction-detection),
which follows Nicholas Renotte's tutorial
[Real Time AI Face Landmark Detection with TensorFlow.js and React](https://www.youtube.com/watch?v=7lXYGDVHUNw).
I used it as the base for my B.Tech mini project. My report and slides are in `Report.pdf` and
`presentation.ppt`.

## How it works

```
Webcam frame
  -> MediaPipe FaceMesh (TensorFlow.js) finds 468 face landmarks
  -> take the nose tip and the two sides of the nose
  -> turn angle: between the nose tip and the side of the nose (left / right)
  -> tilt angle: between the nose line and the vertical (up / down)
  -> draw the mesh, the landmark numbers and both angles on a canvas
```

It checks your face about three times a second. Everything runs in the browser, so no video leaves your computer.

## Running it

You need [Node.js](https://nodejs.org) and a webcam.

```bash
git clone https://github.com/Manishmaurya89/Face-direction-detection.git
cd Face-direction-detection
npx yarn install
npx yarn start
```

Then open http://localhost:3000 and allow camera access. The checkboxes at the top turn the mesh, the landmark
numbers and the direction angles on and off.

## Project layout

```
public/index.html            page template
src/App.js                   webcam, canvas and checkboxes
src/utils/detector.js        loads FaceMesh and runs detection in a loop
src/utils/drawMesh.js        draws the mesh and calculates the turn and tilt angles
src/utils/triangulation.js   landmark triangles for drawing the mesh
```

## Built with

JavaScript, React, TensorFlow.js, MediaPipe FaceMesh and the HTML5 canvas.
