import { convertFileSrc } from "@tauri-apps/api/tauri";

export default {
  getTime(t) {
    if (!t) return;
    t = this.toFixed(t * 100, 2);
    const m = Math.floor(t / 60);
    const s = t % 60 < 10 ? `0${Math.floor(t % 60)}` : Math.floor(t % 60);
    return `${m}:${s}`;
  },

  toFixed(t = 1, f = 2) {
    //used to get time more accurately
    const reg = new RegExp("^-?\\d+(?:.\\d{0," + (f || -1) + "})?");
    const [time] = (t / 100).toString().match(reg) || [];
    return time;
  },

  getCurrentMediaTime(time, duration) {
    if (!time) return 0;
    if (duration > 0) {
      return (time / duration) * 100;
    }
    return 0;
  },

  hasVideo(path, library) {
    let result = false;
    const lib = library ?? [];
    for (const f of lib) {
      if (f.path === `${path}.mp4`) {
        result = true;
        break;
      }
    }
    return result;
  },

  getMotionGraphic(path) {
    return path ? convertFileSrc(`${path}.mp4`) : "";
  },
};
