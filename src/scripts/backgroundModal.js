const backgroundPopup = document.querySelector("#backgroundPopup");

const showBackgroundModal = (srollLockElement) => {
  backgroundPopup.style.display = "block";
  srollLockElement.style.overflow = "hidden";
  srollLockElement.scrollTo({ top: 0, behavior: "smooth" });
};

const hideBackgroundModal = (srollLockElement) => {
  backgroundPopup.style.display = "none";
  srollLockElement.style.overflow = "auto";
};

export { showBackgroundModal, hideBackgroundModal };
