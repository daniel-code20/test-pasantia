interface TitleProps {
    text: string;
  }
  
  export const Title: React.FC<TitleProps> = ({ text }) => {
    return (
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
        {text}
      </h1>
    );
  };
  