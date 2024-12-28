const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// notes တွေသိမ်းဆည်းထားရန် array အနေအားဖြင့် သတ်မှတ်ထားပါသည်။
let notes = [];

// ၎င်း notes များကို rendering လုပ်နိုင်ဖို့ renderingNotes အမည်ရှိ function တစ်ခုကိုတည်ဆောက်ထားပါသည်။
const renderingNotes = () => {
  notesContainer.innerHTML = ""; // ယခင်ကျန်ရှိနေသော notes များကို ဖျက်ပစ်ပြီး အသစ်တဖန်ပြန်လည်ပြသစေပါမည်။ သို့မဟုတ်ပါက notes များထပ်ဆင့်တူညီနေနိုင်ပါသည်။

  // note တစ်ခုချင်းစီကို forEach ဖြင့် loop ပတ်ပြီးပြသပါမည်။
  notes.forEach((note, i) => {
    // note card div တစ်ခုကို createElement ဖြင့် ဖန်တီးယူထားပါသည်။
    const noteCard = document.createElement("div");
    noteCard.classList =
      "p-4 bg-gray-200 rounded-md flex justify-between items-start"; // add tailwind css

    // မှတ်သားထားသော notes များကို p tag ထဲတွင် ဖော်ပြပါမည်။
    const noteText = document.createElement("p");
    noteText.classList = "text-gray-800"; // add tailwind css
    noteText.textContent = note; // notes[] ထဲက note တစ်ခုချင်းစီ၏ စာသားကို ဖော်ပြပါမည်။

    // အလိုမရှိသော notes များကို ပြန်လည်ဖျက်သိမ်းနိုင်ဖို့ရန် note တစ်ခုစီတိုင်းမှာ deleteBtn တစ်ခုပြုလုပ်ထားပါသည်။
    const deleteBtn = document.createElement("button");
    deleteBtn.classList =
      "bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md"; // add tailwind css
    deleteBtn.textContent = "Delete";
    // note delete လုပ်ဖို့ရန် deleteBtn ကို click နှိပ်တဲ့အခါ callback function တစ်ခုကို ခေါ်ပါမည်။
    deleteBtn.addEventListener("click", () => deleteNote(i));

    // elements & contents တွေကို noteCard ထဲထည့်ပါ။ // append || appendChild
    noteCard.append(noteText);
    noteCard.append(deleteBtn);
    notesContainer.appendChild(noteCard);
  });
};

// note မှတ်သားရန် addNoteBtn ကို click နှိပ်ပေးပါ။ callback function တစ်ခုကို ခေါ်ပါမည်။
addNoteBtn.addEventListener("click", () => {
  const note = noteInput.value.trim(); // မှတ်သားလိုသော input note ကို value.trim() ဖြင့်ဖမ်းယူပါသည်။

  // ရိုက်ထည့်လိုက်သော input note ရှိမှသာလျှင် ဆက်အလုပ်လုပ်ပါမည်။
  if (note) {
    // Run the following codes
    notes.push(note); // notes array ထဲထည့်ပါ။
    noteInput.value = ""; // input value ကို ပြန်လည် clear လုပ်ပါ။
    renderingNotes(); // note အသစ်တိုးတိုင်း တစ်ခါပြန် render လုပ်ပါမည်။
  }
});

// note delete လုပ်နိုင်ဖို့ရန်
const deleteNote = (i) => {
  notes.splice(i, 1); // notes array ထဲက index နှင့်ကိုက်ညီသော note element တစ်ခုကိုသာ delete လုပ်ပါမည်။
  renderingNotes(); // note တစ်ခုဖျက်လိုက်တိုင်း တစ်ခါပြန် render လုပ်ပါမည်။
};
