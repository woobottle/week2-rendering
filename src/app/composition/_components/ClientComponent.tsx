"use client";

interface Props {
  children: React.ReactNode;
}

const ClientComponent = ({ children }: Props) => {
  const onClickClientComponent = () => {
    console.log("ClientComponent");
  };

  return (
    <div>
      <button onClick={onClickClientComponent} type="button">
        Client Component
      </button>
      {children}
    </div>
  );
};

export default ClientComponent;
