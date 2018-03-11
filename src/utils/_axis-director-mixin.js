export default {
  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const {scale, format, div} = binding.value;
      d3.select(el).call(d3[axisMethod](scale).ticks(div).tickFormat(format));
    }
  }
}