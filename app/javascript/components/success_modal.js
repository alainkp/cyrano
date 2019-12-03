const hideSuccessModal = () => {
  $("#myModal").modal('hide');
}
const successModal = () => {
  $("#myModal").modal('show');
  setTimeout(hideSuccessModal, 3500)
}

export { successModal };
