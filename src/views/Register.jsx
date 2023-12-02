//Formulario de Registro.

const Register = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Registro</h2>
              <form>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input type="text" className="form-control" placeholder="Ingresa tu nombre" />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control" placeholder="Ingresa tu email" />
                </div>

                <div className="form-group">
                  <label>Contraseña:</label>
                  <input type="password" className="form-control" placeholder="Ingresa tu contraseña" />
                </div>

                <div className="form-group">
                  <label>Confirmar Contraseña:</label>
                  <input type="password" className="form-control" placeholder="Confirma tu contraseña" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
