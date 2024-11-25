export function interpolateKeyframes(keyframes, time) {

  if (keyframes.length < 2) {
    throw new Error('At least two keyframes should be provided');
  }

  // Take the value of the first keyframe if the provided time is before it
  const firstKeyframe = keyframes[0];
  if (time < firstKeyframe.time) {
    return firstKeyframe.value;
  }

  // Take the value of the last keyframe if the provided time is after it
  const lastKeyframe = keyframes[keyframes.length - 1];
  if (time >= lastKeyframe.time) {
    return lastKeyframe.value;
  }

  // Find the keyframes before and after the provided time, like this:
  //
  //                   Time
  // ───  [Keyframe] ───┸───── [Keyframe] ──── [...]
  //
  let index;
  for (index = 0; index < keyframes.length - 1; index++) {
    if (keyframes[index].time <= time && keyframes[index + 1].time >= time) {
      break;
    }
  }

  const keyframe1 = keyframes[index];
  const keyframe2 = keyframes[index + 1];

  // Find out where the provided time falls between the two keyframes from 0 to 1
  let t = (time - keyframe1.time) / (keyframe2.time - keyframe1.time);

  // Apply easing
  if (keyframe2.easing === 'expo-out') {
    t = applyExponentialOutEasing(t);
  } else if (keyframe2.easing === 'cubic-in-out') {
    t = applyCubicInOutEasing(t);
  } else {
    // ... Implement more easing functions
  }

  // Return the interpolated value
  return keyframe1.value + (keyframe2.value - keyframe1.value) * t;
}

// Exponential out easing
function applyExponentialOutEasing(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Cubic in-out easing
function applyCubicInOutEasing(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function applyLinearEasing(t) {
  return t;
}

function applyQuadraticInEasing(t) {
  return t * t;
}

function applyQuadraticOutEasing(t) {
  return t * (2 - t);
}

function applyQuadraticInOutEasing(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function applyCubicInEasing(t) {
  return t * t * t;
}
function applyCubicOutEasing(t) {
  return 1 - Math.pow(1 - t, 3);
}

function applyQuarticInEasing(t) {
  return t * t * t * t;
}
function applyQuarticOutEasing(t) {
  return 1 - Math.pow(1 - t, 4);
}
function applyQuarticInOutEasing(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}
function applyQuinticInEasing(t) {
  return t * t * t * t * t;
}
function applyQuinticOutEasing(t) {
  return 1 - Math.pow(1 - t, 5);
}
function applyQuinticInOutEasing(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}
function applySineInEasing(t) {
  return 1 - Math.cos((t * Math.PI) / 2);
}
function applySineOutEasing(t) {
  return Math.sin((t * Math.PI) / 2);
}
function applySineInOutEasing(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}
function applyExponentialInEasing(t) {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
}

function applyExponentialInOutEasing(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}
function applyElasticInEasing(t) {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
}
function applyElasticOutEasing(t) {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}
function applyElasticInOutEasing(t) {
  const c5 = (2 * Math.PI) / 4.5;
  return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
    ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
}