export default class Numbers {
  constructor() {
    const n = [
      "#### ## ## ####",
      " #  #  #  #  # ",
      "###  #####  ###",
      "###  ####  ####",
      "# ## ####  #  #",
      "####  ###  ####",
      "####  #### ####",
      "###  #  #  #  #",
      "#### ##### ####",
      "#### ####  #  #"
    ];

    const pSize = 20;
    this.numbers = [];
    n.forEach(str => {
      const cn = document.createElement("canvas");
      cn.width = 3 * pSize;
      cn.height = 5 * pSize;
      const ctx = cn.getContext("2d");
      ctx.fillStyle = "#fff";
      str.split("").forEach((char, idx) => {
        if (char === "#")
          ctx.fillRect((idx % 3) * pSize, Math.floor(idx / 3) * pSize, pSize, pSize);
      });
      this.numbers.push(cn);
    });
  }

  getNumber(n) {
    return this.numbers[n];
  }
}