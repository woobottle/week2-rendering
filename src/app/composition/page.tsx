import ClientComponent from "./_components/ClientComponent";
import MarkedComponent from "./_components/MarkedComponent";

const CompositionPage = () => {
  return (
    <div>
      <div>Composition</div>
      <ClientComponent>
        <MarkedComponent />
      </ClientComponent>
    </div>
  );
};

export default CompositionPage;
