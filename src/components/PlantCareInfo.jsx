import '../css/plantcare.css'

const PlantCareInfo = () => {
    return (
      <section className="plant-care-info">
        <h2>Consejos para el Cuidado de tus Plantas</h2>
        <div className="plant-care-columns">
          <div className="column">
            <h3>Consejos Básicos</h3>
            <p>💧 Riega tus plantas regularmente, pero evita el exceso de agua. ¡Las raíces también necesitan respirar!</p>
            <p>🌞 Asegúrate de que tus plantas reciban la cantidad adecuada de luz solar, pero cuidado con el sol directo en especies sensibles.</p>
            <p>🌡️ Mantén un ambiente con temperatura estable. Las plantas no disfrutan de los cambios bruscos.</p>
          </div>
          <div className="column">
            <h3>Datos Divertidos</h3>
            <p>🌵 ¿Sabías que el Cactus puede sobrevivir en los ambientes más secos porque su gruesa piel reduce la pérdida de agua?</p>
            <p>🌻 Los Girasoles pueden "seguir" al sol, un fenómeno conocido como heliotropismo.</p>
            <p>🍃 Algunas plantas como la Venus atrapamoscas pueden atrapar y digerir insectos para obtener nutrientes.</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default PlantCareInfo;
  