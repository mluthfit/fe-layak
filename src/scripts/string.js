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

export { toDateFormat, toCurrencyID, toTimeFormat };
