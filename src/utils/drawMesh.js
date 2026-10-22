import { TRIANGULATION } from "./triangulation";

// Draws the face and returns the head angles. The three checkboxes in App.js
// decide what gets drawn.
export const drawMesh = (prediction, ctx) => {
  const showMesh = document.getElementById("show-mesh").checked;
  const showTagNumbers = document.getElementById("show-tags").checked;
  const showDirection = document.getElementById("show-dir").checked;

  if (!prediction) return;
  const keyPoints = prediction.keypoints;
  if (!keyPoints || keyPoints.length === 0) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawFaceMesh(ctx, keyPoints, showTagNumbers, showMesh);
  return calculateDirection(ctx, keyPoints, showDirection);
};

// Both angles are measured at the back of the nose: yaw is between straight up
// and the nose tip, turn is between the right side of the nose and the nose tip.
// The keypoint indices are MediaPipe FaceMesh landmarks.
function calculateDirection(ctx, keyPoints, draw) {
  const noseTip = keyPoints[1];
  const leftNose = keyPoints[279];
  const rightNose = keyPoints[49];

  // Midpoint between the nostrils, i.e. the back of the nose.
  const midpoint = {
    x: (leftNose.x + rightNose.x) / 2,
    y: (leftNose.y + rightNose.y) / 2,
    z: (leftNose.z + rightNose.z) / 2,
  };
  const perpendicularUp = { x: midpoint.x, y: midpoint.y - 50, z: midpoint.z };

  const yaw = getAngleBetweenLines(midpoint, noseTip, perpendicularUp);
  const turn = getAngleBetweenLines(midpoint, rightNose, noseTip);

  if (draw) {
    const region2 = new Path2D();
    region2.moveTo(leftNose.x, leftNose.y);
    region2.lineTo(noseTip.x, noseTip.y);
    region2.lineTo(rightNose.x, rightNose.y);
    region2.lineTo(midpoint.x, midpoint.y);
    region2.lineTo(leftNose.x, leftNose.y);
    region2.closePath();
    ctx.fillStyle = "brown";
    ctx.stroke(region2);
    ctx.fillText(Math.trunc(turn) + "°", rightNose.x + 10, rightNose.y);
    ctx.fill(region2);

    const region = new Path2D();
    region.moveTo(midpoint.x, midpoint.y);
    region.lineTo(perpendicularUp.x, perpendicularUp.y);
    region.lineTo(noseTip.x, noseTip.y);
    region.lineTo(midpoint.x, midpoint.y);
    region.closePath();
    ctx.fillStyle = "red";
    ctx.stroke(region);
    ctx.fillText(Math.trunc(yaw) + "°", midpoint.x + 10, midpoint.y);
    ctx.fill(region);
  }

  const zDistance = getDistanceBetweenPoints(noseTip, midpoint);
  const xDistance = getDistanceBetweenPoints(leftNose, rightNose);

  return { yaw, turn, zDistance, xDistance };
}

function getDistanceBetweenPoints(point1, point2) {
  const xDistance = point1.x - point2.x;
  const yDistance = point1.y - point2.y;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

// Angle in degrees at `midpoint` between the lines to point1 and point2 (2D only).
function getAngleBetweenLines(midpoint, point1, point2) {
  const vector1 = { x: point1.x - midpoint.x, y: point1.y - midpoint.y };
  const vector2 = { x: point2.x - midpoint.x, y: point2.y - midpoint.y };

  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.hypot(vector1.x, vector1.y);
  const magnitude2 = Math.hypot(vector2.x, vector2.y);

  return (Math.acos(dotProduct / (magnitude1 * magnitude2)) * 180) / Math.PI;
}

function drawFaceMesh(ctx, keyPoints, writeTagNumbers, drawLines) {
  if (drawLines) drawMeshPaths(keyPoints, ctx);
  if (writeTagNumbers) {
    let index = 0;
    for (let keyPoint of keyPoints) {
      ctx.beginPath();
      ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 3 * Math.PI);
      ctx.fillText(index, keyPoint.x, keyPoint.y);
      ctx.fillStyle = "black";
      ctx.fill();
      index++;
    }
  }
}

function drawMeshPaths(keyPoints, ctx) {
  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    const points = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ].map((index) => keyPoints[index]);
    drawPath(ctx, points, true);
  }
}

function drawPath(ctx, points, closePath) {
  const region = new Path2D();
  region.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point.x, point.y);
  }
  if (closePath) region.closePath();
  ctx.strokeStyle = "black";
  ctx.stroke(region);
}
