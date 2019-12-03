const hideSuccessModal = () => {
  $("#myModal").modal('hide');
}
const successModal = () => {
  $("#myModal").modal('show');
  setTimeout(hideSuccessModal, 4000)
}

export { successModal };
