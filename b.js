const valueofid=getCookie("value")
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
  if (dnc == "") {
	setTimeout(() => {window.location.href = "/"; }, 1000);
  } else {
  	loadLogs();
  }
}

async function loadLogs() {
  try {
    const res = await fetch("https://khkttestserver.nguyenthanhhai12072008.workers.dev/getdata/"+valueofid);
	 const res_info = await fetch("https://khkttestserver.nguyenthanhhai12072008.workers.dev/getdevice/"+valueofid);
    const dataObj = await res.json();
	const ValueUser = await res_info.json();
	document.getElementById("iddevice").textContent = ValueUser.id_thietbi;
	document.getElementById("daycreated").textContent = ValueUser.ngay_tao + " UTC+0";
	document.getElementById("emaildevice").textContent = ValueUser.email;
	document.getElementById("sdtdevice").textContent = ValueUser.sdt;
    const select = document.getElementById("logSelect");
    select.innerHTML = '<option value="">-- Chọn thời gian log --</option>';
    const entries = Object.entries(dataObj);
    entries.forEach(([key, val]) => {
      const opt = document.createElement("option");
      const date = new Date(Number(key));
      const timeString = date.toLocaleString();
      opt.value = key;
      opt.textContent = timeString;
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      const key = select.value;
      if (!key) return;
      const data = dataObj[key];
      document.getElementById("speeddevice").textContent = data.speed;
      document.getElementById("geodevice").innerHTML = data.geo +" <a href='https://www.google.com/maps/place/"+data.geo+"'>Nhấn vào xem ở Google Map</a>";
      document.getElementById("foudtruck").textContent = data.foundtruck ? "Có" : "Không";
      document.getElementById("angledevice").textContent = data.angle;
    });

  } catch (err) {
    console.error("00", err);
  }
}
