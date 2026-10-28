// ===== Hair length visualizer (back view) =====

const vizStage = document.querySelector("#viz-svg");

if (vizStage) {   // only run on the Visualizer page

  // ----- 1. Elements -----
  const hairBody = document.querySelector("#hair-body");
  const hairStrands = document.querySelector("#hair-strands");
  const marker = document.querySelector("#viz-marker");
  const markerLabel = document.querySelector("#viz-marker-label");

  const lengthSlider = document.querySelector("#viz-length");
  const lengthOut = document.querySelector("#viz-length-out");
  const textureButtons = document.querySelectorAll("#viz-textures button");

  const titleEl = document.querySelector("#viz-title");
  const landmarkEl = document.querySelector("#viz-landmark");
  const noteEl = document.querySelector("#viz-note");
  const shopLink = document.querySelector("#viz-shop");
  const askLink = document.querySelector("#viz-ask");

  // ----- 2. Data (edit these numbers to fine-tune the picture) -----

  // How each texture behaves. shrink = inches the hair "loses" when it curls up.
  // amp = how far the waves swing, wave = distance between waves, flare = extra volume.
  const textureStyles = {
    "Straight":  { shrink: 0,   amp: 0,   wave: 40, flare: 0 },
    "Body Wave": { shrink: 1.5, amp: 4,   wave: 62, flare: 4 },
    "Deep Wave": { shrink: 2.5, amp: 7,   wave: 44, flare: 9 },
    "Curly":     { shrink: 4,   amp: 8.5, wave: 30, flare: 15 }
  };

  // Where each length lands on the back (average height, about 5'5")
  const landmarks = [
    { inches: 10, label: "nape of the neck" },
    { inches: 12, label: "shoulders" },
    { inches: 14, label: "upper back" },
    { inches: 16, label: "bra line" },
    { inches: 18, label: "mid back" },
    { inches: 20, label: "waist" },
    { inches: 22, label: "lower back" },
    { inches: 24, label: "tailbone" },
    { inches: 26, label: "hips" },
    { inches: 28, label: "lower hips" },
    { inches: 30, label: "upper thigh" }
  ];

  // Half the hair's width at different heights: [y, distance from the centre line]
  // (it starts as the rounded top of the head, then drapes over the shoulders and down the back)
  const hairEdge = [
    [34, 5], [36, 14], [40, 22], [46, 29], [54, 34], [66, 38], [82, 40], [100, 40],
    [120, 37], [135, 38], [150, 44], [165, 54], [185, 60], [220, 62], [300, 60], [500, 56]
  ];

  const CENTER = 200;   // the middle of the drawing
  const TOP = 34;       // the very top of the hair

  // ----- 3. State: the visitor's two choices -----
  const vizState = {
    length: Number(lengthSlider.value),
    texture: "Straight"
  };

  // ----- 4. Helper functions -----

  // Given a height y and a list of [y, value] points, find the value in between
  function interpolate(y, points) {
    if (y <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      if (y <= points[i][0]) {
        const [y1, v1] = points[i - 1];
        const [y2, v2] = points[i];
        return v1 + ((y - y1) / (y2 - y1)) * (v2 - v1);
      }
    }
    return points[points.length - 1][1];
  }

  // Inches of hair -> height on the drawing (about 19.5 units per inch, 10 inches = the nape)
  function inchesToY(inches) {
    return Math.max(122 + (inches - 10) * 19.5, 122);
  }

  // The inches the hair really shows after curling up
  function visibleInches() {
    return vizState.length - textureStyles[vizState.texture].shrink;
  }

  // Which part of the back is closest to this many inches?
  function nearestLandmark(inches) {
    let best = landmarks[0];
    landmarks.forEach(item => {
      if (Math.abs(item.inches - inches) < Math.abs(best.inches - inches)) {
        best = item;
      }
    });
    return best;
  }

  // x position of the hair's edge at height y. side: -1 = left edge, +1 = right edge.
  function edgeX(y, side, style) {
    let distance = interpolate(y, hairEdge);

    // waves start below the head (0 at y=120, full strength at y=190)
    const fade = Math.min(Math.max((y - 120) / 70, 0), 1);
    // the right side gets a slightly different wave, so the hair does not look copy-pasted
    const phase = side === 1 ? 1.3 : 0;
    const wave = Math.sin((y / style.wave) * Math.PI * 2 + phase);

    distance += (style.flare + style.amp * wave) * fade;
    return CENTER + side * distance;
  }

  // The outline of the whole hair, as an SVG path string
  function hairPath(yEnd, style) {
    let d = "";

    // down the left edge
    for (let y = TOP; y < yEnd; y += 2) {
      d += (d === "" ? "M" : "L") + edgeX(y, -1, style).toFixed(1) + " " + y + " ";
    }
    const leftEnd = edgeX(yEnd, -1, style);
    const rightEnd = edgeX(yEnd, 1, style);
    d += "L" + leftEnd.toFixed(1) + " " + yEnd.toFixed(1) + " ";

    // the bottom: one soft curve from left to right
    d += "Q" + CENTER + " " + (yEnd + 16).toFixed(1) + " " + rightEnd.toFixed(1) + " " + yEnd.toFixed(1) + " ";

    // back up the right edge
    for (let y = yEnd - 1; y > TOP; y -= 2) {
      d += "L" + edgeX(y, 1, style).toFixed(1) + " " + y.toFixed(1) + " ";
    }
    return d + "Z";
  }

  // Thin lines running down the hair so it looks like strands, not a flat shape
  function strandPath(yEnd, style) {
    let d = "";
    const fractions = [0.18, 0.38, 0.5, 0.62, 0.82];   // where across the hair each line sits

    fractions.forEach(fraction => {
      let started = false;
      for (let y = 70; y < yEnd - 6; y += 6) {
        const left = edgeX(y, -1, style);
        const right = edgeX(y, 1, style);
        const x = left + (right - left) * fraction;     // a point part-way between the two edges
        d += (started ? "L" : "M") + x.toFixed(1) + " " + y + " ";
        started = true;
      }
    });
    return d;
  }

  // Draw the hair and the marker line for a given end height
  function drawHair(yEnd) {
    const style = textureStyles[vizState.texture];
    hairBody.setAttribute("d", hairPath(yEnd, style));
    hairStrands.setAttribute("d", strandPath(yEnd, style));
    marker.setAttribute("transform", `translate(0 ${yEnd.toFixed(1)})`);
  }

  // ----- 5. Smooth movement -----
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let shownY = inchesToY(visibleInches());   // where the hair end is drawn right now
  let tweenId = 0;

  // Glide the hair end from where it is now to targetY
  function animateTo(targetY) {
    cancelAnimationFrame(tweenId);                 // stop any glide already running
    const startY = shownY;
    const startTime = performance.now();
    const duration = reduceMotion ? 0 : 450;       // milliseconds

    function step(now) {
      const t = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);   // 0 to 1
      const eased = 1 - Math.pow(1 - t, 3);                                       // starts fast, ends gently
      shownY = startY + (targetY - startY) * eased;
      drawHair(shownY);
      if (t < 1) {
        tweenId = requestAnimationFrame(step);     // do it again on the next frame
      }
    }
    tweenId = requestAnimationFrame(step);
  }

  // ----- 6. Update everything when a choice changes -----
  function update() {
    const inches = visibleInches();
    const spot = nearestLandmark(inches);
    const style = textureStyles[vizState.texture];

    lengthOut.textContent = `${vizState.length}″`;
    markerLabel.textContent = `${vizState.length}″`;
    titleEl.textContent = `${vizState.length}″ ${vizState.texture}`;
    landmarkEl.textContent = `Falls around the ${spot.label}`;

    if (style.shrink === 0) {
      noteEl.textContent = "Straight hair hangs at its full length.";
    } else {
      noteEl.textContent =
        `${vizState.texture} hair springs up, so it sits where about ${Math.round(inches)}″ of straight hair would.`;
    }

    // links that carry the choice with them
    shopLink.href = `shop.html?length=${vizState.length}&texture=${encodeURIComponent(vizState.texture)}`;
    shopLink.textContent = `See ${vizState.length}″ ${vizState.texture.toLowerCase()} in the shop`;

    const message =
      `Hello, I am looking at ${vizState.length}" ${vizState.texture} hair, which falls around my ${spot.label}. ` +
      `Please show me what you have.`;
    askLink.href = `https://wa.me/2349164220790?text=${encodeURIComponent(message)}`;

    animateTo(inchesToY(inches));
  }

  // ----- 7. Controls -----
  lengthSlider.addEventListener("input", function () {
    vizState.length = Number(lengthSlider.value);
    update();
  });

  textureButtons.forEach(button => {
    button.addEventListener("click", function () {
      vizState.texture = button.dataset.texture;
      textureButtons.forEach(other => {
        other.classList.toggle("active", other === button);
      });
      update();
    });
  });

  // ----- 8. First draw -----
  drawHair(shownY);
  update();
}