import type { BrowseActivity } from "@/api/mock-data";

const CATEGORY_COLORS: Record<string, string> = {
  football: "#6BCB8B",
  chess:    "#B49AED",
  tennis:   "#7CC8E8",
  music:    "#F2A0C0",
  yoga:     "#A78BFA",
  cooking:  "#FDAB71",
  dance:    "#F087A0",
  art:      "#D9A0F0",
  swimming: "#6DB6D9",
  coding:   "#94A3B8",
  fitness:  "#F5976B",
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_COLORS);

const DEFAULT_CAT_COLOR = "#A1A9B4";

export function catColor(category: string) {
  return CATEGORY_COLORS[category] || DEFAULT_CAT_COLOR;
}

const ICON_PATHS: Record<string, string> = {
  football: `<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" fill="currentColor"/><path d="M128,80l-30,22,11,35h38l11-35Z" fill="currentColor"/><path d="M128,56V80l30,22,20-14L162,56Z" fill="currentColor"/><path d="M128,56V80L98,102,78,88,94,56Z" fill="currentColor"/><path d="M98,102,87,137l-21,6V110Z" fill="currentColor"/><path d="M109,137h38l12,30H97Z" fill="currentColor"/><path d="M158,102l11,35,21,6V110Z" fill="currentColor"/>`,
  chess: `<path d="M220.27,158.54a8,8,0,0,0-7.7-.46,20,20,0,0,1-28.57-18.08,20,20,0,0,1,28.57-18.08,8,8,0,0,0,11.43-7.23V80a16,16,0,0,0-16-16H168.41a20,20,0,0,1,.26-36.12,8,8,0,0,0-.46-14.15A7.93,7.93,0,0,0,164.54,12,8,8,0,0,0,160,16v8a36,36,0,0,0-36,36H88V48a8,8,0,0,0-16,0V60H48A16,16,0,0,0,32,76v36.87a8,8,0,0,0,11.43,7.23A20,20,0,0,1,72,140a20,20,0,0,1-28.57,18.08A8,8,0,0,0,32,165.31V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V165.31A8,8,0,0,0,220.27,158.54Z" fill="currentColor"/>`,
  tennis: `<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM60.31,60.31a87.49,87.49,0,0,1,49.13-28.07,88.33,88.33,0,0,1,0,79.52,87.49,87.49,0,0,1-49.13-28.07A87.49,87.49,0,0,1,32.24,134.56a88.33,88.33,0,0,1,79.52,0,87.49,87.49,0,0,1-28.07,49.13A87.82,87.82,0,0,1,40,128,87.09,87.09,0,0,1,60.31,60.31Zm135.38,0A87.09,87.09,0,0,1,216,128a87.82,87.82,0,0,1-43.69,55.69,87.49,87.49,0,0,1-28.07-49.13,88.33,88.33,0,0,1,79.52,0A87.49,87.49,0,0,1,195.69,60.31ZM146.56,32.24a87.49,87.49,0,0,1,49.13,28.07,87.49,87.49,0,0,1,28.07,49.13,88.33,88.33,0,0,1-79.52,0A87.49,87.49,0,0,1,195.69,60.31,87.49,87.49,0,0,1,146.56,32.24ZM109.44,223.76a87.49,87.49,0,0,1-49.13-28.07,87.49,87.49,0,0,1-28.07-49.13,88.33,88.33,0,0,1,79.52,0,87.49,87.49,0,0,1-28.07,49.13A87.49,87.49,0,0,1,109.44,223.76Zm37.12,0a88.33,88.33,0,0,1,0-79.52,87.49,87.49,0,0,1,49.13,28.07,87.82,87.82,0,0,1-49.13,51.45Z" fill="currentColor"/>`,
  music: `<path d="M210.3,56.34l-80-24A8,8,0,0,0,120,40V148.26A48,48,0,1,0,136,184V50.75l69.7,20.91a8,8,0,1,0,4.6-15.32ZM88,216a32,32,0,1,1,32-32A32,32,0,0,1,88,216Z" fill="currentColor"/>`,
  yoga: `<path d="M128,72a40,40,0,1,0-40-40A40,40,0,0,0,128,72Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,128,8Z" fill="currentColor"/><path d="M208,152c-17.5,0-33.46-5.47-45.42-14.07L143,118.35A8,8,0,0,0,137,116H119a8,8,0,0,0-6,2.35l-19.58,19.58C81.46,146.53,65.5,152,48,152a8,8,0,0,0,0,16c21.47,0,40.69-7.09,54.86-19.22L128,124l25.14,24.78C167.31,160.91,186.53,168,208,168a8,8,0,0,0,0-16Z" fill="currentColor"/><path d="M128,136v72a8,8,0,0,0,16,0V136Z" fill="currentColor"/><path d="M88,208V160a8,8,0,0,0-16,0v48a8,8,0,0,0,16,0Z" fill="currentColor"/><path d="M184,208V160a8,8,0,0,0-16,0v48a8,8,0,0,0,16,0Z" fill="currentColor"/>`,
  art: `<path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,29.82-11.44,42.07-21.66,48.42A8,8,0,0,0,14.66,228,120.34,120.34,0,0,0,48,232a60,60,0,0,0,57.37-77.57C138.29,129.31,188,84.08,188,40V32ZM48,216c-4.6,0-9-.25-13.12-.72C42.48,206.8,48,193.48,48,164a44,44,0,1,1,44,44C76.52,208,61.35,213.16,48,216Z" fill="currentColor"/><circle cx="92" cy="164" r="12" fill="currentColor"/>`,
  swimming: `<path d="M40,88a32,32,0,1,1,32,32A32,32,0,0,1,40,88Zm0,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M48,136l16-16,24,24,32-56,48,48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M24,176c16,0,24,8,40,8s24-8,40-8,24,8,40,8,24-8,40-8,24,8,40,8,24-8,40-8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M24,208c16,0,24,8,40,8s24-8,40-8,24,8,40,8,24-8,40-8,24,8,40,8,24-8,40-8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>`,
  dance: `<path d="M128,72a40,40,0,1,0-40-40A40,40,0,0,0,128,72Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,128,8Z" fill="currentColor"/><path d="M216,136a8,8,0,0,1-8,8H176l-24,48a8,8,0,0,1-14.31,0L112,144H72l-24,48a8,8,0,0,1-14.31,0l-16-32a8,8,0,0,1,14.31-7.16L44,176l24-48H96a8,8,0,0,1,7.16,4.42L128,180.84l24-48A8,8,0,0,1,160,128h48A8,8,0,0,1,216,136Z" fill="currentColor"/>`,
  cooking: `<path d="M88,16a8,8,0,0,1,8-8h8a8,8,0,0,1,0,16h-8A8,8,0,0,1,88,16Zm40,8h8a8,8,0,0,0,0-16h-8a8,8,0,0,0,0,16Zm80,40H48A16,16,0,0,0,32,80v96a40,40,0,0,0,40,40h112a40,40,0,0,0,40-40V80A16,16,0,0,0,208,64Zm0,112a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24V80H208ZM232,96H224a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16ZM32,112h8a8,8,0,0,0,0-16H32a8,8,0,0,0,0,16Z" fill="currentColor"/>`,
  coding: `<path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.29Zm176,27.7-48-40a8,8,0,1,0-10.24,12.29L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.25A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" fill="currentColor"/>`,
  fitness: `<path d="M248,120H224V88a16,16,0,0,0-16-16H184V56a16,16,0,0,0-16-16H88A16,16,0,0,0,72,56V72H48A16,16,0,0,0,32,88v32H8a8,8,0,0,0,0,16H32v32a16,16,0,0,0,16,16H72v16a16,16,0,0,0,16,16h80a16,16,0,0,0,16-16V184h24a16,16,0,0,0,16-16V136h24a8,8,0,0,0,0-16Z" fill="currentColor"/>`,
};

const DEFAULT_ICON_PATH = `<path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" fill="currentColor"/>`;

export function iconSvg(category: string, color: string, size: number): string {
  const path = ICON_PATHS[category] || DEFAULT_ICON_PATH;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256" style="color:${color};display:block;">${path}</svg>`;
}

export function buildActiveMarkerEl(activity: BrowseActivity): HTMLDivElement {
  const el = document.createElement("div");
  const color = catColor(activity.category);
  el.style.cssText = "cursor:pointer;pointer-events:none;";
  el.innerHTML = `
    <div style="
      width:42px;height:42px;
      background:${color};
      border-radius:50%;
      border:2.5px solid #fff;
      box-shadow:0 6px 20px ${color}55;
      display:flex;align-items:center;justify-content:center;
    ">
      ${iconSvg(activity.category, "#fff", 18)}
    </div>
  `;
  return el;
}

export function groupTypeHTML(groupType?: string): string {
  if (!groupType) return "";

  const groupIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256" fill="currentColor"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/></svg>`;
  const soloIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256" fill="currentColor"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/></svg>`;

  if (groupType === "group") {
    return `<span class="cf-popup__group">${groupIcon} Group</span>`;
  } else if (groupType === "individual") {
    return `<span class="cf-popup__group cf-popup__group--solo">${soloIcon} 1:1</span>`;
  } else if (groupType === "both") {
    return `<span class="cf-popup__group">${groupIcon} Group</span><span class="cf-popup__group cf-popup__group--solo">${soloIcon} 1:1</span>`;
  }
  return "";
}

function starSvg(type: "full" | "half" | "empty"): string {
  const size = 13;
  if (type === "full") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256" fill="#FF8A65"><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,91l59.46-5.15,23.21-55.36a16.4,16.4,0,0,1,30.5,0l23.21,55.36L226.92,91A16.46,16.46,0,0,1,234.29,114.85Z"/></svg>`;
  }
  if (type === "half") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256"><defs><linearGradient id="hg"><stop offset="50%" stop-color="#FF8A65"/><stop offset="50%" stop-color="#E5E7EB"/></linearGradient></defs><path fill="url(#hg)" d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,91l59.46-5.15,23.21-55.36a16.4,16.4,0,0,1,30.5,0l23.21,55.36L226.92,91A16.46,16.46,0,0,1,234.29,114.85Z"/></svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256" fill="#E5E7EB"><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,91l59.46-5.15,23.21-55.36a16.4,16.4,0,0,1,30.5,0l23.21,55.36L226.92,91A16.46,16.46,0,0,1,234.29,114.85Z"/></svg>`;
}

export function starsHTML(rating: number): string {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const roundUp = rating % 1 >= 0.75;
  const totalFull = roundUp ? full + 1 : full;
  const totalStars = 5;

  let html = "";
  for (let i = 0; i < totalFull && i < totalStars; i++) html += starSvg("full");
  if (hasHalf && totalFull < totalStars) html += starSvg("half");
  const filled = totalFull + (hasHalf ? 1 : 0);
  for (let i = filled; i < totalStars; i++) html += starSvg("empty");
  return html;
}

export function createPopupHTML(activity: BrowseActivity): string {
  const arrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69l-58.35-58.34a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/></svg>`;

  return `
    <div class="cf-popup">
      <div class="cf-popup__img" style="background-image:url(${activity.image})"></div>
      <div class="cf-popup__body">
        <h4 class="cf-popup__title">${activity.title}</h4>
        <p class="cf-popup__location">${activity.address || activity.location}</p>
        <div class="cf-popup__meta">
          <span class="cf-popup__rating">
            <span class="cf-popup__stars">${starsHTML(activity.rating)}</span>
            <span class="cf-popup__rating-num">${activity.rating}</span>
            <span class="cf-popup__reviews">(${activity.reviewCount})</span>
          </span>
          <span class="cf-popup__price">$${activity.price}/class</span>
        </div>
        <div class="cf-popup__footer">
          <div class="cf-popup__tags">
            <span class="cf-popup__badge">${activity.ageRange}</span>
            ${groupTypeHTML(activity.groupType)}
          </div>
          <a href="/activity/${activity.id}" class="cf-popup__arrow">${arrowSvg}</a>
        </div>
      </div>
    </div>
  `;
}

export function parseSvgPaths(svgString: string): string[] {
  const paths: string[] = [];
  const dRegex = /d="([^"]+)"/g;
  let match;
  while ((match = dRegex.exec(svgString)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

function hasStrokePaths(svgString: string): boolean {
  return svgString.includes('stroke="currentColor"');
}

export function renderIconCanvas(
  category: string,
  state: "regular" | "promoted",
): HTMLCanvasElement {
  const svgString = ICON_PATHS[category] || DEFAULT_ICON_PATH;
  const color = catColor(category);

  const sizes = { regular: 28, promoted: 34 };
  const iconSizes = { regular: 12, promoted: 14 };
  const logicalSize = sizes[state];
  const iconSize = iconSizes[state];
  const px = logicalSize * 2;

  const canvas = document.createElement("canvas");
  canvas.width = px;
  canvas.height = px;
  const ctx = canvas.getContext("2d")!;
  const center = px / 2;
  const radius = px / 2 - 2;

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  if (state === "regular") {
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = color + "4D";
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  const iconColor = state === "regular" ? color : "#ffffff";
  const scale = (iconSize * 2) / 256;
  const offset = center - (iconSize * 2) / 2;

  ctx.save();
  ctx.translate(offset, offset);
  ctx.scale(scale, scale);

  const isStroke = hasStrokePaths(svgString);
  const dPaths = parseSvgPaths(svgString);

  for (const d of dPaths) {
    const path = new Path2D(d);
    if (isStroke) {
      ctx.strokeStyle = iconColor;
      ctx.lineWidth = 16;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke(path);
    } else {
      ctx.fillStyle = iconColor;
      ctx.fill(path);
    }
  }

  ctx.restore();
  return canvas;
}
