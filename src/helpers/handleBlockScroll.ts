export const handleClose = () => {
  if (typeof window !== "undefined" && window.document) {
    window.document.body.style.overflow = "";
  }
};

export const handleOpen = () => {
  if (typeof window !== "undefined" && window.document) {
    window.document.body.style.overflow = "hidden";
  }
};
