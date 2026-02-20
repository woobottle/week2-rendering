"use client";

interface Props {
  children: React.ReactNode;
}

const ClientComponent = ({ children }: Props) => {
  return (
    <div>
      <div>Client Component</div>
      {children}
    </div>
  );
};

export default ClientComponent;
