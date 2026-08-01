const SVG_NS = "http://www.w3.org/2000/svg";

function initQuantIntro() {
  const section = document.querySelector("#quantIntro");
  const canvas = document.querySelector("#quantIntroCanvas");
  const phaseLabel = document.querySelector("#introPhase");
  if (!section || !canvas || !phaseLabel) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const context = canvas.getContext("2d");
  if (!context) return;

  let particles = [];
  let frameId = 0;
  let startTime = 0;
  let active = true;
  let width = section.clientWidth;
  let height = section.clientHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  const easeOutQuint = (value) => 1 - Math.pow(1 - value, 5);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;

  function drawSpacedText(ctx, text, centerX, baseline, spacing) {
    const widths = [...text].map((character) => ctx.measureText(character).width);
    const total = widths.reduce((sum, item) => sum + item, 0) + spacing * (text.length - 1);
    let cursor = centerX - total / 2;
    [...text].forEach((character, index) => {
      ctx.fillText(character, cursor, baseline);
      cursor += widths[index] + spacing;
    });
  }

  function createTargets() {
    const mask = document.createElement("canvas");
    mask.width = width;
    mask.height = height;
    const maskContext = mask.getContext("2d", { willReadFrequently: true });
    if (!maskContext) return [];

    const mobile = width < 620;
    const mainSize = mobile ? clamp(width * .12, 38, 52) : clamp(width * .068, 68, 102);
    const smallSize = mainSize * .7;
    const centerY = height * .49;

    maskContext.fillStyle = "#fff";
    maskContext.textBaseline = "middle";
    maskContext.font = `800 ${smallSize}px Nunito, Manrope, sans-serif`;
    drawSpacedText(maskContext, "AGH", width / 2, centerY - mainSize * .8, mobile ? 5 : 10);
    maskContext.font = `700 ${mainSize}px Nunito, Manrope, sans-serif`;
    drawSpacedText(maskContext, "QUANT FINANCE", width / 2, centerY + mainSize * .12, mobile ? 1.5 : 3);

    const image = maskContext.getImageData(0, 0, width, height).data;
    const step = mobile ? 4 : 5;
    const targets = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        if (image[(y * width + x) * 4 + 3] > 120) targets.push({ x, y });
      }
    }
    const particleLimit = mobile ? 640 : 1100;
    const stride = Math.max(1, Math.ceil(targets.length / particleLimit));
    return targets.filter((_, index) => index % stride === 0);
  }

  function rebuild() {
    width = section.clientWidth;
    height = section.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const targets = createTargets();
    const halfTextWidth = Math.max(
      ...targets.map((target) => Math.abs(target.x - width / 2)),
      1,
    );
    particles = targets.map((target, index) => {
      const angle = (index / Math.max(targets.length, 1)) * Math.PI * 2 + Math.random() * .8;
      const radius = Math.min(width, height) * (.3 + Math.random() * .48);
      const normalizedX = (target.x - width / 2) / halfTextWidth;
      return {
        tx: target.x,
        ty: target.y,
        planeX: target.x - width / 2,
        planeY: target.y - height / 2,
        angle,
        radius,
        speed: .72 + Math.random() * .8,
        offset: Math.random() * Math.PI * 2,
        digit: String(Math.floor(Math.random() * 10)),
        colorMix: target.x / Math.max(width, 1),
        curveDepth: Math.sqrt(Math.max(0, 1 - normalizedX * normalizedX)) * (width < 620 ? 15 : 28),
      };
    });
  }

  function render(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const morph = reducedMotion ? 1 : easeOutQuint(clamp(elapsed / 2200, 0, 1));
    const waveStrength = reducedMotion ? 0 : easeOutQuint(clamp((elapsed - 1700) / 1100, 0, 1));
    const gentleSway = Math.sin(elapsed * .00045) * 2 * Math.PI / 180 * waveStrength;
    const rotation = reducedMotion ? 0 : lerp(0, -8 * Math.PI / 180, morph) + gentleSway;
    const cosine = Math.cos(rotation);
    const sine = Math.sin(rotation);
    const focalLength = Math.max(width, height) * 1.2;
    const maxDepth = Math.max(height * .28, 1);
    context.clearRect(0, 0, width, height);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `${width < 620 ? 9 : 11}px ${getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace"}`;

    particles.forEach((particle, index) => {
      const orbitAngle = particle.angle + elapsed * .0015 * particle.speed + Math.sin(elapsed * .001 + particle.offset) * .3;
      const shrinkingRadius = particle.radius * (1 - morph * .82);
      const orbitX = width / 2 + Math.cos(orbitAngle) * shrinkingRadius;
      const orbitY = height / 2 + Math.sin(orbitAngle) * shrinkingRadius * .58;
      const wavePhase = elapsed * .0011 + particle.planeX * .016 + particle.planeY * .008;
      const waveY = Math.sin(wavePhase) * (width < 620 ? 1.25 : 2.4) * waveStrength;
      const waveDepth = Math.cos(wavePhase * .82) * (width < 620 ? 4 : 7) * waveStrength;

      const projectPoint = (extrusion) => {
        const animatedDepth = extrusion + waveDepth;
        const rotatedX = particle.planeX * cosine + animatedDepth * sine;
        const depth = -particle.planeX * sine + animatedDepth * cosine;
        const perspective = clamp(focalLength / (focalLength + depth), .72, 1.3);
        return {
          x: width / 2 + rotatedX * perspective,
          y: height / 2 + (particle.planeY + waveY) * perspective,
          scale: perspective,
          depth,
        };
      };
      const front = projectPoint(-particle.curveDepth);
      const middle = projectPoint(16 - particle.curveDepth);
      const back = projectPoint(32 - particle.curveDepth);
      const x = lerp(orbitX, front.x, morph);
      const y = lerp(orbitY, front.y, morph);
      const faceLight = clamp(.62 - front.depth / maxDepth * .18 + Math.abs(cosine) * .18, .38, .96);
      const alpha = lerp(.46, faceLight, morph);
      const cyan = particle.colorMix > .62;

      if (morph > .62) {
        const extrusionAlpha = (morph - .62) / .38;
        context.fillStyle = cyan
          ? `rgba(23, 91, 121, ${.24 * extrusionAlpha})`
          : `rgba(47, 35, 132, ${.34 * extrusionAlpha})`;
        context.save();
        context.translate(lerp(orbitX, back.x, morph), lerp(orbitY, back.y, morph));
        context.scale(back.scale, back.scale);
        context.fillText(particle.digit, 0, 0);
        context.restore();
        context.fillStyle = cyan
          ? `rgba(39, 142, 171, ${.25 * extrusionAlpha})`
          : `rgba(77, 59, 185, ${.3 * extrusionAlpha})`;
        context.save();
        context.translate(lerp(orbitX, middle.x, morph), lerp(orbitY, middle.y, morph));
        context.scale(middle.scale, middle.scale);
        context.fillText(particle.digit, 0, 0);
        context.restore();
      }

      context.fillStyle = cyan
        ? `rgba(91, 222, 255, ${alpha})`
        : `rgba(151, 137, 255, ${alpha})`;
      context.save();
      context.translate(x, y);
      context.rotate((orbitAngle + index * .09) * (1 - morph));
      context.scale(front.scale, front.scale);
      context.shadowColor = cyan
        ? `rgba(91, 222, 255, ${alpha * .45})`
        : `rgba(151, 137, 255, ${alpha * .45})`;
      context.shadowBlur = morph > .8 ? 4 : 0;
      context.fillText(particle.digit, 0, 0);
      context.restore();

      if (index % 11 === 0 && elapsed % 90 < 18 && morph < .9) {
        particle.digit = String(Math.floor(Math.random() * 10));
      }
    });

    phaseLabel.textContent = reducedMotion
      ? "STATIC DATA OBJECT"
      : morph < .96
        ? "ASSEMBLING DATA"
        : "GENTLE WAVE / 3D";

    if (reducedMotion) {
      frameId = 0;
      return;
    }
    frameId = active ? requestAnimationFrame(render) : 0;
  }

  function handleResize() {
    rebuild();
    if (!frameId) render(startTime ? startTime + 2200 : performance.now());
  }

  const launch = () => {
    rebuild();
    if (reducedMotion) {
      render(2300);
      return;
    }
    if (active && !frameId) frameId = requestAnimationFrame(render);
  };

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    if (active && !frameId && !reducedMotion) frameId = requestAnimationFrame(render);
    if (!active && frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  }, { threshold: .02 });

  visibilityObserver.observe(section);
  window.addEventListener("resize", handleResize);
  if (document.fonts?.ready) document.fonts.ready.then(launch, launch);
  else launch();
}

const heroData = [
  100, 101, 99, 104, 106, 105, 109, 108, 113, 111, 115, 116,
  114, 118, 121, 119, 124, 122, 127, 130, 128, 132, 134, 139,
  136, 141, 145, 143, 149, 147, 152, 157, 154, 160, 163, 166,
  162, 168, 171, 176, 173, 180, 184, 181, 187, 192, 196, 201,
];

const heroBenchmark = [
  100, 101, 102, 101, 104, 106, 105, 108, 110, 109, 112, 113,
  115, 114, 117, 119, 118, 121, 120, 123, 125, 124, 127, 129,
  128, 131, 133, 132, 135, 136, 138, 137, 140, 142, 141, 144,
  146, 145, 148, 149, 151, 150, 153, 155, 154, 157, 159, 161,
];

const makePath = (data, width, height, padX, padY, min = Math.min(...data), max = Math.max(...data)) => {
  const points = data.map((value, index) => ({
    x: padX + (index / (data.length - 1)) * (width - padX * 2),
    y: height - padY - ((value - min) / (max - min || 1)) * (height - padY * 2),
    value,
  }));
  const d = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
  return { d, points };
};

const createSvg = (tag, attrs = {}) => {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
};

function initHeroChart() {
  const svg = document.querySelector("#heroChart");
  if (!svg) return;
  const width = 720;
  const height = 350;
  const padX = 36;
  const padY = 34;
  const { d, points } = makePath(heroData, width, height, padX, padY, 92, 208);
  const benchmark = makePath(heroBenchmark, width, height, padX, padY, 92, 208);
  const grid = svg.querySelector(".chart-grid-lines");
  const axisLabels = svg.querySelector(".chart-axis-labels");

  [50, 115, 180, 245, 310].forEach((y) => grid.appendChild(createSvg("line", { x1: 36, y1: y, x2: 684, y2: y })));
  [36, 198, 360, 522, 684].forEach((x) => grid.appendChild(createSvg("line", { x1: x, y1: 30, x2: x, y2: 310 })));
  ["STY", "KWI", "LIP", "PAŹ", "GRU"].forEach((label, index) => {
    const text = createSvg("text", { x: 36 + index * 162, y: 336, "text-anchor": index === 4 ? "end" : index === 0 ? "start" : "middle" });
    text.textContent = label;
    axisLabels.appendChild(text);
  });

  svg.querySelector(".chart-line").setAttribute("d", d);
  svg.querySelector(".chart-line-glow").setAttribute("d", d);
  svg.querySelector(".chart-benchmark").setAttribute("d", benchmark.d);
  svg.querySelector(".chart-area").setAttribute("d", `${d} L${points.at(-1).x},310 L${points[0].x},310 Z`);

  const mainLine = svg.querySelector(".chart-line");
  const length = mainLine.getTotalLength();
  mainLine.style.strokeDasharray = length;
  mainLine.style.strokeDashoffset = length;
  requestAnimationFrame(() => {
    mainLine.style.transition = "stroke-dashoffset 1.8s cubic-bezier(.22,.8,.25,1)";
    mainLine.style.strokeDashoffset = 0;
  });

  const hitbox = svg.querySelector(".chart-hitbox");
  const focus = svg.querySelector(".chart-focus");
  const tooltip = document.querySelector(".chart-tooltip");
  const dateLabel = tooltip.querySelector(".tooltip-date");
  const valueLabel = tooltip.querySelector(".tooltip-value");
  const months = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];

  const updateFocus = (event) => {
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const index = Math.max(0, Math.min(points.length - 1, Math.round(((x - padX) / (width - padX * 2)) * (points.length - 1))));
    const point = points[index];
    focus.querySelector("line").setAttribute("x1", point.x);
    focus.querySelector("line").setAttribute("x2", point.x);
    focus.querySelector(".focus-ring").setAttribute("cx", point.x);
    focus.querySelector(".focus-ring").setAttribute("cy", point.y);
    focus.querySelector(".focus-dot").setAttribute("cx", point.x);
    focus.querySelector(".focus-dot").setAttribute("cy", point.y);
    const chartX = (point.x / width) * rect.width;
    const chartY = (point.y / height) * rect.height;
    tooltip.style.left = `${Math.max(70, Math.min(rect.width - 70, chartX))}px`;
    tooltip.style.top = `${chartY + 4}px`;
    dateLabel.textContent = `${months[Math.min(11, Math.floor(index / 4))]} 26`;
    valueLabel.textContent = `${Math.round(100000 + (point.value - 100) * 280).toLocaleString("pl-PL")} PLN`;
    focus.classList.add("is-visible");
    tooltip.classList.add("is-visible");
  };
  hitbox.addEventListener("pointermove", updateFocus);
  hitbox.addEventListener("pointerleave", () => {
    focus.classList.remove("is-visible");
    tooltip.classList.remove("is-visible");
  });
}

const strategies = {
  momentum: {
    name: "Cross-sectional momentum",
    description: "Kupujemy aktywa z najwyższą stopą zwrotu z ostatnich 12 miesięcy i równoważymy ryzyko zmiennością.",
    params: ["252D", "21D", "WIG80"],
    metrics: ["18.4%", "1.42", "−14.8%"],
    data: [100, 103, 101, 106, 111, 108, 116, 119, 126, 122, 131, 138, 142, 151, 148, 158, 166, 173, 169, 181, 190, 198],
  },
  reversion: {
    name: "Short-term mean reversion",
    description: "Szukamy krótkoterminowych odchyleń ceny od lokalnej średniej i zajmujemy pozycję na powrót do równowagi.",
    params: ["10D", "5D", "WIG40"],
    metrics: ["13.1%", "1.18", "−9.6%"],
    data: [100, 102, 105, 103, 108, 111, 109, 115, 117, 114, 121, 125, 123, 130, 133, 132, 139, 142, 146, 143, 151, 157],
  },
  pairs: {
    name: "Cointegrated pairs",
    description: "Identyfikujemy stabilne relacje między parami akcji i handlujemy odchyleniem spreadu od jego długoterminowej średniej.",
    params: ["90D", "1D", "WIG20"],
    metrics: ["10.7%", "1.61", "−6.4%"],
    data: [100, 101, 103, 106, 105, 109, 111, 114, 113, 117, 120, 119, 124, 126, 129, 128, 133, 136, 138, 141, 145, 149],
  },
};

const benchmarkData = [100, 102, 101, 104, 107, 105, 110, 112, 109, 115, 118, 116, 121, 123, 127, 125, 129, 133, 136, 134, 141, 145];

function drawLabChart(strategyKey, animate = true) {
  const strategy = strategies[strategyKey];
  const svg = document.querySelector("#labChart");
  const width = 800;
  const height = 380;
  const padX = 35;
  const padY = 45;
  const all = [...strategy.data, ...benchmarkData];
  const min = Math.min(...all) - 8;
  const max = Math.max(...all) + 10;
  const strategyPath = makePath(strategy.data, width, height, padX, padY, min, max);
  const benchmarkPath = makePath(benchmarkData, width, height, padX, padY, min, max);
  const grid = svg.querySelector(".lab-grid");
  if (!grid.childNodes.length) {
    [55, 120, 185, 250, 315].forEach((y) => grid.appendChild(createSvg("line", { x1: 35, y1: y, x2: 765, y2: y })));
    [35, 181, 327, 473, 619, 765].forEach((x) => grid.appendChild(createSvg("line", { x1: x, y1: 45, x2: x, y2: 335 })));
  }
  const strategyNode = svg.querySelector(".strategy-path");
  const benchmarkNode = svg.querySelector(".benchmark-path");
  strategyNode.setAttribute("d", strategyPath.d);
  benchmarkNode.setAttribute("d", benchmarkPath.d);
  const labels = svg.querySelector(".lab-end-labels");
  labels.innerHTML = "";
  const sEnd = strategyPath.points.at(-1);
  const bEnd = benchmarkPath.points.at(-1);
  const sLabel = createSvg("text", { x: sEnd.x - 4, y: sEnd.y - 12, fill: "#9b8fff", "text-anchor": "end" });
  sLabel.textContent = `MODEL ${strategy.metrics[0]}`;
  const bLabel = createSvg("text", { x: bEnd.x - 4, y: bEnd.y + 20, fill: "#727b96", "text-anchor": "end" });
  bLabel.textContent = "WIG 8.7%";
  labels.append(sLabel, bLabel);
  if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const length = strategyNode.getTotalLength();
    strategyNode.style.transition = "none";
    strategyNode.style.strokeDasharray = length;
    strategyNode.style.strokeDashoffset = length;
    requestAnimationFrame(() => {
      strategyNode.style.transition = "stroke-dashoffset .9s cubic-bezier(.22,.8,.25,1)";
      strategyNode.style.strokeDashoffset = 0;
    });
  }
}

function selectStrategy(key) {
  const strategy = strategies[key];
  document.querySelectorAll(".strategy-tab").forEach((tab) => {
    const active = tab.dataset.strategy === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active);
  });
  document.querySelector("#strategyName").textContent = strategy.name;
  document.querySelector("#strategyDesc").textContent = strategy.description;
  document.querySelector("#paramLookback").textContent = strategy.params[0];
  document.querySelector("#paramRebalance").textContent = strategy.params[1];
  document.querySelector("#paramUniverse").textContent = strategy.params[2];
  document.querySelector("#metricCagr").textContent = strategy.metrics[0];
  document.querySelector("#metricSharpe").textContent = strategy.metrics[1];
  document.querySelector("#metricDrawdown").textContent = strategy.metrics[2];
  drawLabChart(key);
}

function initLab() {
  document.querySelectorAll(".strategy-tab").forEach((tab) => tab.addEventListener("click", () => selectStrategy(tab.dataset.strategy)));
  drawLabChart("momentum", false);
  const run = document.querySelector("#runBacktest");
  const status = document.querySelector("#backtestStatus");
  run.addEventListener("click", () => {
    const active = document.querySelector(".strategy-tab.is-active").dataset.strategy;
    run.disabled = true;
    status.textContent = "RUNNING...";
    setTimeout(() => {
      drawLabChart(active);
      status.textContent = "COMPLETE ✓";
      run.disabled = false;
      setTimeout(() => (status.textContent = "READY"), 1700);
    }, 650);
  });
}

function initMatrix() {
  const matrix = document.querySelector("#matrix");
  if (!matrix) return;
  const values = [12,22,35,48,61,75,88,64,46,28,16];
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 11; col += 1) {
      const value = Math.max(8, Math.min(94, values[Math.abs(col - row) % values.length] + ((row * col * 7) % 24) - 8));
      const cell = document.createElement("i");
      cell.style.setProperty("--v", `${value}%`);
      cell.style.setProperty("--o", `${0.45 + value / 180}`);
      matrix.appendChild(cell);
    }
  }
}

function initUi() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".desktop-nav");
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!open));
    menu.setAttribute("aria-label", open ? "Otwórz menu" : "Zamknij menu");
    nav.classList.toggle("is-open", !open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
  }));

  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

initQuantIntro();
initHeroChart();
initLab();
initMatrix();
initUi();
