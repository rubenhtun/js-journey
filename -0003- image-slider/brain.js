// Image urls အားလုံးကို imgs array တစ်ခုထဲတွင် သိမ်းဆဲထားပါ။
const imgs = ["robotic-eng(1).jpg", "robotic-eng(2).jpg", "robotic-eng(3).jpg"];

// Array ထဲမှ img url တစ်ခုချင်းစီကိုရယူနိုင်ရန် index variable တစ်ခုတည်ဆောက်ပါ။
let currentImgIndex = 0;

// ပြန်အပြောင်းအလဲလုပ်လိုသည့် Slider Image ကို document.getElementById ဖြင့်ရယူပါ။
const sliderImage = document.getElementById("slider-image");

// Index တန်ဖိုး အတိုး/အလျော့ ဖြင့် images တွေကိုရယူနိုင်ဖို့ function တစ်ခု တည်ဆောက်ပါမည်။
function changeImage() {
  sliderImage.src = `img/${imgs[currentImgIndex]}`;
}

// Images တွေကို အပြောင်းအလဲလုပ်မှာသည် prev and next buttons တွေဖြစ်တဲ့အတွက် သူတို့ကို event listener နဲ့နားထောင်ရပါမည်။
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Buttons တွေကို click event နဲ့အသက်သွင်းရတော့ပါမည်။
nextBtn.addEventListener("click", () => {
  // အကယ်၍ current index သည် နောက်ဆုံး index ဖြစ်ခဲ့လျှင် 0 ကိုပြန်ရောက်ရှိသွားရမည်ဖြစ်ပါသည်။
  // နောက်ဆုံး index မဟုတ်ပါက လက်ရှိ index ကို တစ်တိုးပါမည်။
  currentImgIndex =
    currentImgIndex === imgs.length - 1 ? 0 : currentImgIndex + 1;
  changeImage();
});

prevBtn.addEventListener("click", () => {
  // အကယ်၍ current index သည် 0 တန်ဖိုးဖြစ်ခဲ့လျှင် နောက်ဆုံး index ကိုပြန်ရောက်ရှိသွားရမည်ဖြစ်ပါသည်။
  // လက်ရှိ index ဟာ 0 မဟုတ်ပါက တစ်လျော့ပါမည်။
  currentImgIndex =
    currentImgIndex === 0 ? imgs.length - 1 : currentImgIndex - 1;
  changeImage();
});
