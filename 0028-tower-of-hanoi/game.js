// Add animation to rings //
let moveTimes = 0;
document.querySelectorAll(".ring").forEach((ring) => {
  ring.addEventListener("mouseenter", () => {
    ring.style.animation = "animate-pulse 0.5s infinite";
  });
  ring.addEventListener("mouseleave", () => {
    ring.style.animation = "none";
  });

  ring.addEventListener("dragstart", (e) => {
    if (!isTrueMove(ring)) {
      e.preventDefault();
      alert("Only top ring is allowed to move!");
      return;
    }
    e.dataTransfer.setData("draggedRing", e.target.id);
  });
});

const isTrueMove = (ring) => {
  const holdingPeg = ring.parentElement;
  const rings = holdingPeg.querySelectorAll(".ring");
  return rings[0] == ring; // မှန်ရင် true မှန်မရင် false //
};

document.querySelectorAll(".peg").forEach((peg) => {
  peg.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  peg.addEventListener("drop", (e) => {
    e.preventDefault();

    const draggedRingId = e.dataTransfer.getData("draggedRing");
    const draggedRingElement = document.getElementById(draggedRingId);
    const targetPeg = e.target;

    if (targetPeg.classList.contains("peg")) {
      const existingRings = Array.from(targetPeg.querySelectorAll(".ring"));

      if (existingRings.length > 0) {
        // peg ဝင်ရိုးတွင်ရှိနေတဲ့ ထိပ်ဆုံး ring ကိုရယူ //
        const topRing = existingRings[0];
        // ထိပ်ဆုံး ring ၏ data-ring attribute တန်ဖိုးနှင့် drag လုပ်ယူလာတဲ့ ring ၏ data-ring attribute တန်ဖိုးကို နှိုင်းယှဉ် //
        if (
          parseInt(draggedRingElement.getAttribute("data-ring")) <
          parseInt(topRing.getAttribute("data-ring"))
        ) {
          targetPeg.appendChild(draggedRingElement);
          moveTimes++;
        } else {
          alert(
            "A larger ring cannot be placed on top of a smaller ring. Please move the rings accordingly."
          );
        }
      } else {
        // peg ဝင်ရိုးတွင် ဘယ် ring မှမရှိဘူးဆိုရင် //
        targetPeg.appendChild(draggedRingElement);
        moveTimes++;
      }
      rearrangement();
      winCondition();
    } else {
      alert("Make sure to drop the ring on the peg.");
    }
  });
});

const rearrangement = () => {
  // rings တွေကို ငယ်စဉ်ကြီးလိုက်ပြန်စီ //
  document.querySelectorAll(".peg").forEach((peg) => {
    rearrangeRings = Array.from(peg.getElementsByClassName("ring"));

    rearrangeRings.sort((small, large) => {
      return (
        parseInt(small.getAttribute("data-ring")) -
        parseInt(large.getAttribute("data-ring"))
      );
    });

    rearrangeRings.forEach((ring) => {
      peg.appendChild(ring);
    });
  });
};

// rings.length သည် 9 နဲ့ညိီပါက အောင်မြင်ပါမည်။ //
const winCondition = () => {
  document.querySelectorAll(".peg").forEach((peg) => {
    const rings = peg.querySelectorAll(".ring");
    if (rings.length === 9) {
      setTimeout(() => {
        alert("Congratulations! You win the game.");
      }, 2000);
    }
  });
};

// restart btn နှိပ်တဲ့အခါ game ကိုပြန်စတင်ပါမည်။ //
document.getElementById("restartBtn").addEventListener("click", () => {
  const peg2 = document.getElementById("peg2");
  const collectRings = document.querySelectorAll(".ring");
  collectRings.forEach((ring) => {
    peg2.appendChild(ring);
    rearrangement();
  });
});
