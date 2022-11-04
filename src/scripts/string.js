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
  const month = monthLabel[newDate.getMonth() + 1];
  const year = newDate.getFullYear();

  return `${date} ${month} ${year}`;
};

const toCurrencyID = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export { toDateFormat, toCurrencyID };
