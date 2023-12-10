
import '../css/gracias.css';

const ThankYouPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-3">¡Gracias por tu compra!</h1>
          <p className="lead">Tu pedido ha sido procesado con éxito.</p>
          <hr className="my-4"/>
          <p>Pronto recibirás un correo electrónico con la confirmación del pedido y los detalles de envío.</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="/" role="button">Volver a la tienda</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
