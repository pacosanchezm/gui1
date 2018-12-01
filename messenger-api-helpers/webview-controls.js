const close = () => {
  window.MessengerExtensions.requestCloseBrowser(function success() {
    return;
  }, function error(err) {
    console.error(
      err,
      'No se puede cerrar la ventana.',
      'Es posile que la este accesando desde fuera de messenger.'
    );
  });
};

export default {
  close,
};
