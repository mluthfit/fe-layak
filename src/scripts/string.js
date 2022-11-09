const monthLabel = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const toDateFormat = (stringDate) => {
  const newDate = new Date(stringDate);

  const day = newDate.getDate();
  const date = day < 10 ? `0${day}` : day;
  const month = monthLabel[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${date} ${month} ${year}`;
};

const toCurrencyID = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const toTimeFormat = (stringTime) => {
  if (stringTime === null) {
    return null;
  }

  const [hour, minute] = stringTime.split(":");
  return `${hour}:${minute}`;
};

function toImageFile(base64, fileName) {
  var arr = base64.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}

export { toDateFormat, toCurrencyID, toTimeFormat, toImageFile };
