interface ResetButtonProps {
    onClick: () => void;
  }
  
  export const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
    return (
      <div className="mb-6">
        <button
          onClick={onClick}
          className="bg-blue-200 text-blue-500 font-medium px-4 py-2 rounded hover:bg-blue-300 transition"
        >
          Reiniciar Lista
        </button>
      </div>
    );
  };
  