# Face Direction Detection

Real-time face direction detection in the browser. The app finds 468 face landmarks in your webcam feed with
TensorFlow.js and MediaPipe FaceMesh, then measures how far your head is turned and tilted from the position of
your nose.

## Credits

This code comes from [sshadmand/face-direction-detection](https://github.com/sshadmand/face-direction-detection),
which follows Nicholas Renotte's tutorial
[Real Time AI Face Landmark Detection with TensorFlow.js and React](https://www.youtube.com/watch?v=7lXYGDVHUNw).
I used it as the base of my B.Tech mini project. My project report and slides are in `Report.pdf` and
`presentation.ppt`.

## How it works

```
Webcam frame
  → MediaPipe FaceMesh (TensorFlow.js) finds 468 face landmarks
  → Take the nose tip and the two sides of the nose
  → Turn angle: angle between the nose tip and the side of the nose (left / right)
  → Tilt angle: angle between the nose line and the vertical (up / down)
  → Draw the mesh, the landmark numbers and both angles on a canvas
```

Detection runs about three times a second, entirely in the browser. No video leaves your computer.

## Run it

You need [Node.js](https://nodejs.org) and a webcam.

```bash
git clone https://github.com/Manishmaurya89/Face-direction-detection.git
cd Face-direction-detection
npx yarn install
npx yarn start
```

Open [http://localhost:3000](http://localhost:3000) and allow camera access. Use the checkboxes to show the mesh,
the landmark numbers and the direction angles.

## Project structure

```
.
├── public/index.html          page template
├── src/App.js                 webcam, canvas and checkboxes
├── src/utils/detector.js      loads FaceMesh and runs detection in a loop
├── src/utils/drawMesh.js      draws the mesh and calculates the turn and tilt angles
├── src/utils/triangulation.js landmark triangles for drawing the mesh
└── package.json
```

## Tech stack

JavaScript · React · TensorFlow.js · MediaPipe FaceMesh · HTML5 Canvas
