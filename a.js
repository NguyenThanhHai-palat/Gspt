const Connectform = document.getElementById("connectform");
Connectform.addEventListener("submit", (e) => {
  e.preventDefault();
  const Connectformdata = Object.fromEntries(new FormData(Connectform).entries()); 
  let Valueinp = document.getElementById("id_device").value.trim();
  fetch('https://khkttestserver.nguyenthanhhai12072008.workers.dev/connect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Connectformdata)
  })

  .then(response => {
    if (response.status === 201) {
      alert('Kết nối thành công');
  		setCookie("value", Valueinp, 15);
        setTimeout(() => {window.location.href = "../device.html"; }, 1000);
    } else {
      alert('Có vẻ ID Không tồn tại');
    }
  })
  Connectform.reset();
});
function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function onload() {
  let dnc = getCookie("value");
  if (dnc != "") {
	setTimeout(() => {window.location.href = "../device.html"; }, 1000);
  } else {
  }
}
