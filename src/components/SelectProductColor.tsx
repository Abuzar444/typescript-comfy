type SelectProductColorProps = {
  colors: string[];
  productColor: string;
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
};

const SelectProductColor = ({
  colors,
  setProductColor,
  productColor,
}: SelectProductColorProps) => {
  return (
    <div className='mt-16'>
      {colors.map((color) => {
        return (
          <button
            key={color}
            type='button'
            className={`rounded-full h-6 w-6 mr-2 border-2 ${
              color === productColor && "border-primary"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setProductColor(color)}
          ></button>
        );
      })}
    </div>
  );
};
export default SelectProductColor;
