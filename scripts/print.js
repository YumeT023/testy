import pc from "picocolors";

export default {
  title(s) {
    const bars = "=".repeat(s.length * 3);
    console.log(bars);
    console.log(pc.bgRed(pc.yellow(s)));
    console.log(bars);
  },
  step(s) {
    console.log(`> ${s}...`);
  },
};
