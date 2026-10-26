export default function Tag({ label, color }) {
    // Делаем цвет фона полупрозрачным (20%), а границу чуть плотнее (50%)
    return (
        <span
            className="text-[10px] uppercase font-bold px-2 py-1 rounded-sm whitespace-nowrap border"
            style={{
                backgroundColor: `${color}20`, // 20% прозрачности (HEX + 20)
                borderColor: `${color}50`,     // 50% прозрачности
                color: '#fff'                  // Белый текст для контраста
            }}
        >
      {label}
    </span>
    );
}