import '../../../index.css';

const InformationComponent = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-32 mb-32 revealing-image">
        <h2 className="text-3xl font-semibold text-white mb-20">Nunc consectetur gravida</h2>
        <div className="flex items-center">
          <img className="w-60" src="/images/imagenprueba.jpg" alt="fernando alonso" />
          <div className="w-36 h-1 bg-white" />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-1.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-96 bg-white " />
        </div>
        <div className="flex items-center">
          <div className="w-96 bg-white " />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-2.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-36 h-1 bg-white" />
          <img className="w-60" src="/images/imagenprueba.jpg" alt="fernando alonso" />
        </div>
        <div className="flex items-center">
          <img className="w-60" src="/images/imagenprueba.jpg" alt="fernando alonso" />
          <div className="w-36 h-1 bg-white" />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-3.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-96 bg-white " />
        </div>
        <div className="flex items-center">
          <div className="w-96 bg-white " />
          <div className="flex flex-col items-center">
            <div className="w-1 h-32 bg-white" />
            <img className="h-16 w-16" src="/icons/numbers/numero-4.png" alt="logo" />
            <div className="w-1 h-32 bg-white" />
          </div>
          <div className="w-36 h-1 bg-white" />
          <img className="w-60" src="/images/imagenprueba.jpg" alt="fernando alonso" />
        </div>
      </div>
    </>
  );
};

export default InformationComponent;
